$(document).ready(function(){

var language = {
'Ukrainian' : 'uk', 'Russian' : 'ru', 'English' : 'en',
'German' : 'de', 'Azerbaijan' : 'az', 'Malagasy' : 'mg',
'Albanian' : 'sq', 'Malay' : 'ms',  'Maltese' : 'mt',
'Arab' : 'ar', 'Macedonian' : 'mk', 'Armenian' : 'hy',
'Mongolian' : 'mn', 'afrikaans' : 'af', 'basque' : 'eu',
'Norwegian' : 'no', 'Bashkir' : 'ba', 'Punjabi' : 'pa',
'Belarusian' : 'be', 'Persian' : 'fa', 'Bengal' : 'bn',
'Polish' : 'pl', 'Bulgarian' : 'bg', 'Portuguese' : 'pt',
'Bosnian' : 'bs', 'Romanian' : 'ro', 'Welsh' : 'cy',
'Hungarian' : 'hu', 'Serbian' : 'sr', 'Vietnamese' : 'vi',
'Sinhala' : 'si', 'Haitian (Creole)' : 'ht', 'French': 'fr',
'Slovak' : 'sk', 'Galician' :'gl', 'Slovenian' :'sl',
'Dutch' :'nl', 'Swahili' : 'sw', 'Greek' : 'el',
'Tajik' : 'tg', 'Georgian' : 'ka', 'Thai' : 'th',
'Gujarati' : 'gu', 'Tagalog' : 'tl', 'Danish' : 'da',
'Tamil' : 'ta', 'Hebrew' : 'he', 'Tatar' : 'tt',
'Indonesian' : 'id', 'Turkish' : 'tr', 'Irish' : 'ga',
'Udmurt' : 'udm', 'Italian': 'it', 'Uzbek'  : 'uz',
'Icelandic' : 'is', 'Spanish' :  'es', 'Urdu'  :  'ur',
'Kazakh'  : 'kk', 'Finnish': 'fi', 'Cannada' :'kn',
'Catalan' :'ca', 'Hindi'  : 'hi', 'Kyrgyz' : 'ky',
'Croatian' : 'hr', 'Chinese'  : 'zh', 'Czech' :'cs',
'Korean' :  'ko', 'Swedish'  :  'sv', 'Latin' : 'la',
'Estonian'  : 'et', 'Latvian' :  'lv', 'Japanese'  :  'ja',
'Lithuanian'  : 'lt'
}
var options ='';
$.each(language, function(key, value) {
    var b = '<option>' + key + '</option>'
    options += b
});
$('.select').append(options)


$("#submit").on('click', function(e){
    e.preventDefault();
    $('.language').remove();
    text = $('#write').val();
    var a = language[$('#select1').val()]
    var b = language[$('#select2').val()]
    function result (lang){
        var link = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20160709T164708Z.6f9e7fa023f1c18e.baeda3f605cbb7cb4e9e50f4893a6a9a52b8330f&text=' + text + '&lang=' + lang;
        $.ajax({type: 'GET',
            url: link,
            success: function (response) {
                $("#result").val(response.text[0])
            }
        })
    }
        if (text!='') {
            $.ajax({
                type: "POST",
                url: 'https://translate.yandex.net/api/v1.5/tr.json/detect?key=trnsl.1.1.20160709T164708Z.6f9e7fa023f1c18e.baeda3f605cbb7cb4e9e50f4893a6a9a52b8330f&text='+ text,
                success: function (response) {
                    if (!a) {
                        lang = response.lang +'-'+ b
                        result(lang)
                        $.each(language, function(key, value) {
                            response.lang == value && $('.block').first().prepend('<span class="language">' + key + '</span>')
                        });
                    } else {
                        lang = a+'-'+b
                        result(lang)
                    }
                }
            })
        }
    })
})

$('#write').keyup(function(){
    var text = $(this).val();
    if(!text) {
        $('#result').val('')
        $('.language').remove()
    }
})
$('#write').change(function(){
    var text = $(this).val();
    if(!text) {
        $('#result').val('')
    }
})
$('#select2').change(function(){
    $('#result').val('')
})

$('#select1').change(function(){
    $('.language').remove();
    $('#result').val('');
})