var adtival_url = 'https://www.shrinkads.com/';
var adtival_api_token = 'ad24d20d67cc2c35c28a212c435583fad60ad14b';
var adtival_advert = 2;
var adtival_domains = ['tinyurl.com'];
function adtival_get_url(e){var n=document.createElement("a");return n.href=e,n}function adtival_get_host_name(e){return null==e||""===e||e.match(/^\#/)?"":-1===(e=adtival_get_url(e)).href.search(/^http[s]?:\/\//)?"":e.href.split("/")[2].split(":")[0].toLowerCase()}function adtival_base64_encode(e){return btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g,function(e,n){return String.fromCharCode("0x"+n)}))}function adtival_get_wildcard_domains(e){var n=[];for(i=0;i<e.length;i++)e[i].match(/^\*\./)&&n.push(e[i].replace(/^\*\./,""));return n}function adtival_match_wildcard_domain(e,n){var l=adtival_get_wildcard_domains(e);for(i=0;i<l.length;i++)if(n.substr(-1*l[i].length)===l[i])return!0;return!1}function adtival_domain_exist(e,n){return e.indexOf(n)>-1||adtival_match_wildcard_domain(e,n)}document.addEventListener("DOMContentLoaded",function(e){if("undefined"!=typeof adtival_url&&"undefined"!=typeof adtival_api_token){var n=1;"undefined"!=typeof adtival_advert&&(2==adtival_advert&&(n=2),0==adtival_advert&&(n=0));var l=document.getElementsByTagName("a");if("undefined"==typeof adtival_domains)if("undefined"==typeof adtival_exclude_domains);else for(t=0;t<l.length;t++){(a=adtival_get_host_name(l[t].getAttribute("href"))).length>0&&!1===adtival_domain_exist(adtival_exclude_domains,a)?l[t].href=adtival_url+"full/?api="+encodeURIComponent(adtival_api_token)+"&url="+adtival_base64_encode(l[t].href)+"&type="+encodeURIComponent(n):"magnet:"===l[t].protocol&&(l[t].href=adtival_url+"full/?api="+encodeURIComponent(adtival_api_token)+"&url="+adtival_base64_encode(l[t].href)+"&type="+encodeURIComponent(n))}else for(var t=0;t<l.length;t++){var a;(a=adtival_get_host_name(l[t].getAttribute("href"))).length>0&&adtival_domain_exist(adtival_domains,a)?l[t].href=adtival_url+"full/?api="+encodeURIComponent(adtival_api_token)+"&url="+adtival_base64_encode(l[t].href)+"&type="+encodeURIComponent(n):"magnet:"===l[t].protocol&&(l[t].href=adtival_url+"full/?api="+encodeURIComponent(adtival_api_token)+"&url="+adtival_base64_encode(l[t].href)+"&type="+encodeURIComponent(n))}}});