// menu
jQuery(window).scroll(function () {
  var $sections = $('section');
  $sections.each(function (i, el) {
    var top = $(el).offset().top - 100;
    var bottom = top + $(el).height();
    var scroll = $(window).scrollTop();
    var id = $(el).attr('id');
    if (scroll > top && scroll < bottom) {
      $('a.menu__link_active').removeClass('menu__link_active');
      $('a[href="#' + id + '"]').addClass('menu__link_active');
    }
  });
});

// slider brand
$(document).ready(function () {
  $('.brands').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: false,
    nextArrow: false,
    dots: false,
    responsive: [{
        breakpoint: 1020,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 525,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });
});

// mask form
$('.phone').mask('8 (999) 999-99-99');

// $(document).ready(function () {
  
//   //E-mail Ajax Send
//   $("form").submit(function () { //Change
//     var th = $(this);
//     $.ajax({
//       type: "POST",
//       url: "mail.php", //Change
//       data: th.serialize()
//     }).done(function () {
//       setTimeout(function () {
//         $('#overlay').fadeIn();
//         //строки для остлеживания целей в Я.Метрике и Google Analytics
//       }, 80);
//       $('#overlay').on('click', function (e) {
//         $(this).fadeOut();
//       });
//       setTimeout(function () {
//         // Done Functions
//         th.trigger("reset");
//       }, 1000);
//     });
//     return false;
//   });
// });

//Передача инфо о кнопке в модальное окно
$(function () {
  $('button.btn').click(function () {
    var parent = $(this).attr('data-parent');
    var modal = $(this).attr('data-target')
    $(modal).find('input[name=target]').val(parent);
  })
});

$(document).ready(function () {
  $('[data-submit]').on('click', function (e) {
    e.preventDefault();
    $(this).parent('form').submit();
  })
  $.validator.addMethod(
    "regex",
    function (value, element, regexp) {
      var re = new RegExp(regexp);
      return this.optional(element) || re.test(value);
    },
    "Please check your input."
  );

  // Функция валидации и вывода сообщений
  function valEl(el) {

    el.validate({
      rules: {
        tel: {
          errorContainer: "false",
          required: true,
          regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
        },
        name: {
          required: true
        }
      },

      // Начинаем проверку id="" формы
      submitHandler: function (form) {
        $('#loader').fadeIn();
        var $form = $(form);
        var $formId = $(form).attr('id');
        switch ($formId) {
            // Если у формы id="popupResult" - делаем:
          case 'feedback-form':
            $.ajax({
                type: 'POST',
                url: $form.attr('action'),
                data: $form.serialize(),
              })
              .always(function (response) {
                setTimeout(function () {
                  $('#loader').fadeOut();
                }, 800);
                setTimeout(function () {
                  $('#overlay').fadeIn();
                  $form.trigger('reset');
                  //строки для остлеживания целей в Я.Метрике и Google Analytics
                }, 1100);
                $('#overlay').on('click', function (e) {
                  $(this).fadeOut();
                });

              });
            break;
        }
        return false;
      }
    })
  }
  // Запускаем механизм валидации форм, если у них есть класс .js-form
  $('.js-form').each(function () {
    valEl($(this));
  });
});