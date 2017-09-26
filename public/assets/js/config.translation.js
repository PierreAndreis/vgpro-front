
i18next
  .use(i18nextXHRBackend)
  .init({
      lng: getLang(),
      backend: {
          loadPath: '/locales/{{lng}}/{{ns}}.json?id=1'
      }
    }, function(err, t) {
      jqueryI18next.init(i18next, $);
      $('body').localize();

  });

function getLang() {
          var language = Cookies.get('lang');
          if(language){
            var flag = language;
            if(flag == 'en'){flag = "us"};
            $(".language_selected .lang_seled").html("<span class='flag-icon flag-icon-"+flag+"'></span>"+language+"</div>");
            return language;
          }else{
            Cookies.set('lang', 'en');
            return 'en';
          }
        }