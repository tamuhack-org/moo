$("#after").hide();
      $("#u_failed").hide();
      $(document).ready(function() {
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
      });