const { ref, computed } = Vue;

const template = `
    <div id="content-container">
      <div id="content-container-center">
        <h3>{{option_a}} vs {{option_b}}!</h3>

        <form id="choice" name='form' method="POST" action="http://localhost:5000/">
          <button id="a" type="submit" name="vote" class="a" value="a">{{option_a}}</button>
          <button id="b" type="submit" name="vote" class="b" value="b">{{option_b}}</button>
        </form>

        <div id="tip">
          (Tip: you can change your vote)
        </div>
        <div id="hostname">
          Processed by container ID {{hostname}}
        </div>
      </div>
    </div>
    
`;


// The following will be added in the template
// Can Vue be used to update DOM instead of JQUERY ?
// The idea is just to flag the item that has been selected

/*
<script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.js"></script>
    {{ if (selection !== '') { 
      <script>
        if({{selection}} == "a"){
          $(".a").prop('disabled', true);
          $(".a").html('{{option_a}} <i class="fa fa-check-circle"></i>');
          $(".b").css('opacity','0.5');
        }
        if({{selection}} == "b"){
          $(".b").prop('disabled', true);
          $(".b").html('{{option_b}} <i class="fa fa-check-circle"></i>');
          $(".a").css('opacity','0.5');
        }
      </script>
      }
    }}
    */

export default {
  template,
  setup() {
    const option_a = "Cats"
    const option_b = "Dogs"
    let selection = ''
    const select = (selectedOption) => {
      console.log(selectedOption);
      selection = selectedOption;

      // Build formData object.
      let formData = new FormData();
      formData.append('vote', selectedOption);

      // Note: nginx will be used later on to proxy the POST 
      fetch('http://localhost:5000/', {
        method: 'post',
        body: formData,
      }).then(function (response) {
        //TODO: server should send back the name of the container that handled the request
        console.log(response.text());
      })
    }
    return {
      option_a,
      option_b,
      selection,
      select,
    }
  }
}
