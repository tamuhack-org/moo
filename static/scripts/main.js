
      $(document).ready(function() {
        $("#after").hide();
        $("#u_failed").hide();
        // Listen to submit event on the <form> itself!
        $("#email-form").submit(function(e) {
          e.preventDefault();
          var email = $("#email").val();

          if (
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              email
            )
          ) {
            fetch("/email", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ email: email })
            });
            $("#u_failed").hide();
            $("#before").remove();
            $("#after").show();
          } else {
            console.log("invalid email");
            $("#u_failed").show();
          }
        });

        // Dynamically changing where the page scrolls based on the height of the nav
        const navbarHeight = $("#top-nav-bar").outerHeight();
        for (const element of $('.goto')){
          $(element).css("padding-bottom", navbarHeight);
          $(element).css("margin-top", -navbarHeight);
        }

        // Very important feature.
        var trigger = document.getElementById('good-morning-trigger');
        var morning = document.getElementById('good-morning')
        var sun = document.getElementById('sun');
        sun.style.visibility = "visible"
        morning.style.visibility = "hidden"
        trigger.onclick = function() {
          [sun.style.visibility, morning.style.visibility] = [morning.style.visibility, sun.style.visibility]
        }
      });
