(function () {
  var themeToggle = document.querySelector(".theme-toggle");
  var copyButtons = document.querySelectorAll("[data-copy-target]");

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var root = document.documentElement;
      var isDark = root.dataset.theme === "dark";
      root.dataset.theme = isDark ? "light" : "dark";
      themeToggle.setAttribute("aria-pressed", String(!isDark));
      themeToggle.textContent = isDark ? "Dark" : "Light";
    });
  }

  function setButtonState(button, label, state) {
    button.textContent = label;
    if (state) {
      button.dataset.state = state;
    } else {
      delete button.dataset.state;
    }
  }

  function fallbackCopy(text) {
    var area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.top = "-999px";
    area.style.left = "-999px";
    document.body.appendChild(area);
    area.select();

    try {
      var successful = document.execCommand("copy");
      document.body.removeChild(area);
      return successful;
    } catch (error) {
      document.body.removeChild(area);
      return false;
    }
  }

  copyButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var target = document.getElementById(button.dataset.copyTarget);
      if (!target) {
        setButtonState(button, "Select text", "failed");
        return;
      }

      var text = target.innerText.trim();
      var reset = function () {
        window.setTimeout(function () {
          setButtonState(button, "Copy");
        }, 1800);
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function () {
          setButtonState(button, "Copied", "copied");
          reset();
        }).catch(function () {
          if (fallbackCopy(text)) {
            setButtonState(button, "Copied", "copied");
          } else {
            setButtonState(button, "Select text", "failed");
          }
          reset();
        });
        return;
      }

      if (fallbackCopy(text)) {
        setButtonState(button, "Copied", "copied");
      } else {
        setButtonState(button, "Select text", "failed");
      }
      reset();
    });
  });

  var trackedSections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".side-nav a"));

  if ("IntersectionObserver" in window && trackedSections.length > 0) {
    var observer = new IntersectionObserver(function (entries) {
      var visible = entries
        .filter(function (entry) { return entry.isIntersecting; })
        .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; })[0];

      if (!visible) {
        return;
      }

      var id = visible.target.id;
      navLinks.forEach(function (link) {
        if (link.getAttribute("href") === "#" + id) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }, {
      rootMargin: "-20% 0px -65% 0px",
      threshold: [0.1, 0.25, 0.5]
    });

    trackedSections.forEach(function (section) {
      observer.observe(section);
    });
  }
})();
