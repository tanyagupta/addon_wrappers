////
var GLOBAL = {main_term : "News",
              du_ger_dan_eng_fr:["af","alle","andet","andre","at","begge","da","de","den","denne","der","deres","det","dette","dig","din","dog","du","ej","eller","en","end","ene","eneste","enhver","et","fem",
                         "fire","flere","fleste","for","fordi","forrige","fra","få","før","god","han","hans","har","hendes","her","hun","hvad","hvem","hver","hvilken","hvis","hvor","hvordan","hvorfor",
                         "hvornår","i","ikke","ind","ingen","intet","jeg","jeres","kan","kom","kommer","lav","lidt","lille","man","mand","mange","med","meget","men","mens","mere","mig","ned","ni","nogen",
                         "noget","ny","nyt","nær","næste","næsten","og","op","otte","over","på","se","seks","ses","som","stor","store","syv","ti","til","to","tre","ud","var","a","actualmente","acuerdo",
                         "adelante","ademas","además","adrede","afirmó","agregó","ahi","ahora","ahí","al","algo","alguna","algunas","alguno","algunos","algún","alli","allí","alrededor","ambos","ampleamos",
                         "antano","antaño","ante","anterior","antes","apenas","aproximadamente","aquel","aquella","aquellas","aquello","aquellos","aqui","aquél","aquélla","aquéllas","aquéllos","aquí",
                         "arriba","arribaabajo","aseguró","asi","así","atras","aun","aunque","ayer","añadió","aún","b","bajo","bastante","bien","breve","buen","buena","buenas","bueno","buenos","c","cada",
                         "casi","cerca","cierta","ciertas","cierto","ciertos","cinco","claro","comentó","como","con","conmigo","conocer","conseguimos","conseguir","considera","consideró","consigo","consigue",
                         "consiguen","consigues","contigo","contra","cosas","creo","cual","cuales","cualquier","cuando","cuanta","cuantas","cuanto","cuantos","cuatro","cuenta","cuál","cuáles","cuándo","cuánta",
                         "cuántas","cuánto","cuántos","cómo","d","da","dado","dan","dar","de","debajo","debe","deben","debido","decir","dejó","del","delante","demasiado","demás","dentro","deprisa","desde",
                         "despacio","despues","después","detras","detrás","dia","dias","dice","dicen","dicho","dieron","diferente","diferentes","dijeron","dijo","dio","donde","dos","durante","día","días",
                         "dónde","e","ejemplo","el","ella","ellas","ello","ellos","embargo","empleais","emplean","emplear","empleas","empleo","en","encima","encuentra","enfrente","enseguida","entonces",
                         "entre","era","eramos","eran","eras","eres","es","esa","esas","ese","eso","esos","esta","estaba","estaban","estado","estados","estais","estamos","estan","estar","estará","estas",
                         "este","esto","estos","estoy","estuvo","está","están","ex","excepto","existe","existen","explicó","expresó","f","fin","final","fue","fuera","fueron","fui","fuimos","g","general",
                         "gran","grandes","gueno","h","ha","haber","habia","habla","hablan","habrá","había","habían","hace","haceis","hacemos","hacen","hacer","hacerlo","haces","hacia","haciendo","hago",
                         "han","hasta","hay","haya","he","hecho","hemos","hicieron","hizo","horas","hoy","hubo","i","igual","incluso","indicó","informo","informó","intenta","intentais","intentamos",
                         "intentan","intentar","intentas","intento","ir","j","junto","k","l","la","lado","largo","las","le","lejos","les","llegó","lleva","llevar","lo","los","luego","lugar","m","mal",
                         "manera","manifestó","mas","mayor","me","mediante","medio","mejor","mencionó","menos","menudo","mi","mia","mias","mientras","mio","mios","mis","misma","mismas","mismo","mismos",
                         "modo","momento","mucha","muchas","mucho","muchos","muy","más","mí","mía","mías","mío","míos","n","nada","nadie","ni","ninguna","ningunas","ninguno","ningunos","ningún","no",
                         "nos","nosotras","nosotros","nuestra","nuestras","nuestro","nuestros","nueva","nuevas","nuevo","nuevos","nunca","o","ocho","os","otra","otras","otro","otros","p","pais","para",
                         "parece","parte","partir","pasada","pasado","paìs","peor","pero","pesar","poca","pocas","poco","pocos","podeis","podemos","poder","podria","podriais","podriamos","podrian","podrias",
                         "podrá","podrán","podría","podrían","poner","por","porque","posible","primer","primera","primero","primeros","principalmente","pronto","propia","propias","propio","propios",
                         "proximo","próximo","próximos","pudo","pueda","puede","pueden","puedo","pues","q","qeu","que","quedó","queremos","quien","quienes","quiere","quiza","quizas","quizá","quizás","quién",
                         "quiénes","qué","r","raras","realizado","realizar","realizó","repente","respecto","s","sabe","sabeis","sabemos","saben","saber","sabes","salvo","se","sea","sean","segun","segunda",
                         "segundo","según","seis","ser","sera","será","serán","sería","señaló","si","sido","siempre","siendo","siete","sigue","siguiente","sin","sino","sobre","sois","sola","solamente",
                         "solas","solo","solos","somos","son","soy","soyos","su","supuesto","sus","suya","suyas","suyo","sé","sí","sólo","t","tal","tambien","también","tampoco","tan","tanto","tarde","te",
                         "temprano","tendrá","tendrán","teneis","tenemos","tener","tenga","tengo","tenido","tenía","tercera","ti","tiempo","tiene","tienen","toda","todas","todavia","todavía","todo","todos",
                         "total","trabaja","trabajais","trabajamos","trabajan","trabajar","trabajas","trabajo","tras","trata","través","tres","tu","tus","tuvo","tuya","tuyas","tuyo","tuyos","tú","u","ultimo",
                         "un","una","unas","uno","unos","usa","usais","usamos","usan","usar","usas","uso","usted","ustedes","v","va","vais","valor","vamos","van","varias","varios","vaya","veces","ver",
                         "verdad","verdadera","verdadero","vez","vosotras","vosotros","voy","vuestra","vuestras","vuestro","vuestros","w","x","y","ya","yo","z","él","ésa","ésas","ése","ésos","ésta","éstas",
                         "éste","éstos","última","últimas","último","últimos","Ernst","Ordnung","Schluss","a","ab","aber","ach","acht","achte","achten","achter","achtes","ag","alle","allein","allem","allen",
                         "aller","allerdings","alles","allgemeinen","als","also","am","an","andere","anderen","andern","anders","au","auch","auf","aus","ausser","ausserdem","außer","außerdem","b","bald",
                         "bei","beide","beiden","beim","beispiel","bekannt","bereits","besonders","besser","besten","bin","bis","bisher","bist","c","d","d.h","da","dabei","dadurch","dafür","dagegen","daher",
                         "dahin","dahinter","damals","damit","danach","daneben","dank","dann","daran","darauf","daraus","darf","darfst","darin","darum","darunter","darüber","das","dasein","daselbst","dass",
                         "dasselbe","davon","davor","dazu","dazwischen","daß","dein","deine","deinem","deiner","dem","dementsprechend","demgegenüber","demgemäss","demgemäß","demselben","demzufolge","den",
                         "denen","denn","denselben","der","deren","derjenige","derjenigen","dermassen","dermaßen","derselbe","derselben","des","deshalb","desselben","dessen","deswegen","dich","die","diejenige","diejenigen","dies","diese","dieselbe","dieselben","diesem","diesen","dieser","dieses","dir","doch","dort","drei","drin","dritte","dritten","dritter","drittes","du","durch","durchaus","durfte","durften","dürfen","dürft","e","eben","ebenso","ehrlich","ei","ei,","eigen","eigene","eigenen","eigener","eigenes","ein","einander","eine","einem","einen","einer","eines","einige","einigen","einiger","einiges","einmal","eins","elf","en","ende","endlich","entweder","er","erst","erste","ersten","erster","erstes","es","etwa","etwas","euch","euer","eure","f","folgende","früher","fünf","fünfte","fünften","fünfter","fünftes","für","g","gab","ganz","ganze","ganzen","ganzer","ganzes","gar","gedurft","gegen","gegenüber","gehabt","gehen","geht","gekannt","gekonnt","gemacht","gemocht","gemusst","genug","gerade","gern","gesagt","geschweige","gewesen","gewollt","geworden","gibt","ging","gleich","gott","gross","grosse","grossen","grosser","grosses","groß","große","großen","großer","großes","gut","gute","guter","gutes","h","habe","haben","habt","hast","hat","hatte","hatten","hattest","hattet","heisst","her","heute","hier","hin","hinter","hoch","hätte","hätten","i","ich","ihm","ihn","ihnen","ihr","ihre","ihrem","ihren","ihrer","ihres","im","immer","in","indem","infolgedessen","ins","irgend","ist","j","ja","jahr","jahre","jahren","je","jede","jedem","jeden","jeder","jedermann","jedermanns","jedes","jedoch","jemand","jemandem","jemanden","jene","jenem","jenen","jener","jenes","jetzt","k","kam","kann","kannst","kaum","kein","keine","keinem","keinen","keiner","kleine","kleinen","kleiner","kleines","kommen","kommt","konnte","konnten","kurz","können","könnt","könnte","l","lang","lange","leicht","leide","lieber","los","m","machen","macht","machte","mag","magst","mahn","mal","man","manche","manchem","manchen","mancher","manches","mann","mehr","mein","meine","meinem","meinen","meiner","meines","mensch","menschen","mich","mir","mit","mittel","mochte","mochten","morgen","muss","musst","musste","mussten","muß","mußt","möchte","mögen","möglich","mögt","müssen","müsst","müßt","n","na","nach","nachdem","nahm","natürlich","neben","nein","neue","neuen","neun","neunte","neunten","neunter","neuntes","nicht","nichts","nie","niemand","niemandem","niemanden","noch","nun","nur","o","ob","oben","oder","offen","oft","ohne","p","q","r","recht","rechte","rechten","rechter","rechtes","richtig","rund","s","sa","sache","sagt","sagte","sah","satt","schlecht","schon","sechs","sechste","sechsten","sechster","sechstes","sehr","sei","seid","seien","sein","seine","seinem","seinen","seiner","seines","seit","seitdem","selbst","sich","sie","sieben","siebente","siebenten","siebenter","siebentes","sind","so","solang","solche","solchem","solchen","solcher","solches","soll","sollen","sollst","sollt","sollte","sollten","sondern","sonst","soweit","sowie","später","startseite","statt","steht","suche","t","tag","tage","tagen","tat","teil","tel","tritt","trotzdem","tun","u","uhr","um","und","und?","uns","unser","unsere","unserer","unter","v","vergangenen","viel","viele","vielem","vielen","vielleicht","vier","vierte","vierten","vierter","viertes","vom","von","vor","w","wahr?","wann","war","waren","wart","warum","was","wegen","weil","weit","weiter","weitere","weiteren","weiteres","welche","welchem","welchen","welcher","welches","wem","wen","wenig","wenige","weniger","weniges","wenigstens","wenn","wer","werde","werden","werdet","weshalb","wessen","wie","wieder","wieso","will","willst","wir","wird","wirklich","wirst","wissen","wo","wohl","wollen","wollt","wollte","wollten","worden","wurde","wurden","während","währenddem","währenddessen","wäre","würde","würden","x","y","z","z.b","zehn","zehnte","zehnten","zehnter","zehntes","zeit","zu","zuerst","zugleich","zum","zunächst","zur","zurück","zusammen","zwanzig","zwar","zwei","zweite","zweiten","zweiter","zweites","zwischen","zwölf","über","überhaupt","übrigens","af","alle","andet","andre","at","begge","da","de","den","denne","der","deres","det","dette","dig","din","dog","du","ej","eller","en","end","ene","eneste","enhver","et","fem","fire","flere","fleste","for","fordi","forrige","fra","få","før","god","han","hans","har","hendes","her","hun","hvad","hvem","hver","hvilken","hvis","hvor","hvordan","hvorfor","hvornår","i","ikke","ind","ingen","intet","jeg","jeres","kan","kom","kommer","lav","lidt","lille","man","mand","mange","med","meget","men","mens","mere","mig","ned","ni","nogen","noget","ny","nyt","nær","næste","næsten","og","op","otte","over","på","se","seks","ses","som","stor","store","syv","ti","til","to","tre","ud","var","a","a's","able","about","above","according","accordingly","across","actually","after","afterwards","again","against","ain't","all","allow","allows","almost","alone","along","already","also",
                         "although","always","am","among","amongst","an","and","another","any","anybody","anyhow","anyone","anything","anyway","anyways","anywhere","apart","appear","appreciate","appropriate","are","aren't","around","as","aside","ask","asking","associated","at","available","away","awfully","b","be","became","because","become","becomes","becoming","been","before","beforehand","behind","being","believe","below","beside","besides","best","better","between","beyond","both","brief","but","by","c","c'mon","c's","came","can","can't","cannot","cant","cause","causes","certain","certainly","changes","clearly","co","com","come","comes","concerning","consequently","consider","considering","contain","containing","contains","corresponding","could","couldn't","course","currently","d","definitely","described","despite","did","didn't","different","do","does","doesn't","doing","don't","done","down","downwards","during","e","each","edu","eg","eight","either","else","elsewhere","enough","entirely","especially","et","etc","even","ever","every","everybody","everyone","everything","everywhere","ex","exactly","example","except","f","far","few","fifth","first","five","followed","following","follows","for","former","formerly","forth","four","from","further","furthermore","g","get","gets","getting","given","gives","go","goes","going","gone","got","gotten","greetings","h","had","hadn't","happens","hardly","has","hasn't","have","haven't","having","he","he's","hello","help","hence","her","here","here's","hereafter","hereby","herein","hereupon","hers","herself","hi","him","himself","his","hither","hopefully","how","howbeit","however","i","i'd","i'll","i'm","i've","ie","if","ignored","immediate","in","inasmuch","inc","indeed","indicate","indicated","indicates","inner","insofar","instead","into","inward","is","isn't","it","it'd","it'll","it's","its","itself","j","just","k","keep","keeps","kept","know","known","knows","l","last","lately","later","latter","latterly","least","less","lest","let","let's","like","liked","likely","little","look","looking","looks","ltd","m","mainly","many","may","maybe","me","mean","meanwhile","merely","might","more","moreover","most","mostly","much","must","my","myself","n","name","namely","nd","near","nearly","necessary","need","needs","neither","never","nevertheless","new","next","nine","no","nobody","non","none","noone","nor","normally","not","nothing","novel","now","nowhere","o","obviously","of","off","often","oh","ok","okay","old","on","once","one","ones","only","onto","or","other","others","otherwise","ought","our","ours","ourselves","out","outside","over","overall","own","p","particular","particularly","per","perhaps","placed","please","plus","possible","presumably","probably","provides","q","que","quite","qv","r","rather","rd","re","really","reasonably","regarding","regardless","regards","relatively","respectively","right","s","said","same","saw","say","saying","says","second","secondly","see","seeing","seem","seemed","seeming","seems","seen","self","selves","sensible","sent","serious","seriously","seven","several","shall","she","should","shouldn't","since","six","so","some","somebody","somehow","someone","something","sometime","sometimes","somewhat","somewhere","soon","sorry","specified","specify","specifying","still","sub","such","sup","sure","t","t's","take","taken","tell","tends","th","than","thank","thanks","thanx","that","that's","thats","the","their","theirs","them","themselves","then","thence","there","there's","thereafter","thereby","therefore","therein","theres","thereupon","these","they","they'd","they'll","they're","they've","think","third","this","thorough","thoroughly","those","though","three","through","throughout","thru","thus","to","together","too","took","toward","towards","tried","tries","truly","try","trying","twice","two","u","un","under","unfortunately","unless","unlikely","until","unto","up","upon","us","use","used","useful","uses","using","usually","uucp","v","value","various","very","via","viz","vs","w","want","wants","was","wasn't","way","we","we'd","we'll","we're","we've","welcome","well","went","were","weren't","what","what's","whatever","when","whence","whenever","where","where's","whereafter","whereas","whereby","wherein","whereupon","wherever","whether","which","while","whither","who","who's","whoever","whole","whom","whose","why","will","willing","wish","with","within","without","won't","wonder","would","wouldn't","x","y","yes","yet","you","you'd","you'll","you're","you've","your","yours","yourself","yourselves","z","zero","a","abord","vous-mêmes","vu","vé","vôtre","vôtres","w","x","y","z","zut","à","â","ça","ès","étaient","étais","était","étant","été","être","ô","absolument","afin","vont","vont","vos","votre",
              "vous","ah","ai","aie","ailleurs","ainsi","ait","allaient","allo","allons","allô","alors","anterieur","anterieure","anterieures","apres","après","as","assez","attendu","au","aucun",
              "aucune","aujourd","aujourd'hui","aupres","auquel","aura","auraient","aurait","auront","aussi","autre","autrefois","autrement","autres","autrui","aux","auxquelles","auxquels","avaient",
              "avais","avait","avant","avec","avoir","avons","ayant","b","bah","bas","basee","bat","beau","beaucoup","bien","bigre","boum","bravo","brrr","c","car","ce","ceci","cela","celle","celle-ci","celle-là","celles","celles-ci","celles-là","celui","celui-ci","celui-là","cent","cependant","certain","certaine","certaines","certains","certes","ces","cet","cette","ceux","ceux-ci","ceux-là","chacun","chacune","chaque","cher","chers","chez","chiche","chut","chère","chères","ci","cinq","cinquantaine","cinquante","cinquantième","cinquième","clac","clic","combien","comme","comment","comparable","comparables","compris","concernant","contre","couic","crac","d","da","dans","de","debout","dedans","dehors","deja","delà","depuis","dernier","derniere","derriere","derrière","des","desormais","desquelles","desquels","dessous","dessus","deux","deuxième","deuxièmement","devant","devers","devra","different","differentes","differents","différent","différente","différentes","différents","dire","directe","directement","dit","dite","dits","divers","diverse","diverses","dix","dix-huit","dix-neuf","dix-sept","dixième","doit","doivent","donc","dont","douze","douzième","dring","du","duquel","durant","dès","désormais","e","effet","egale","egalement","egales","eh","elle","elle-même","elles","elles-mêmes","en","encore","enfin","entre","envers","environ","es","est","et","etant","etc","etre","eu","euh","eux","eux-mêmes","exactement","excepté","extenso","exterieur","f","fais","faisaient","faisant","fait","façon","feront","fi","flac","floc","font","g","gens","h","ha","hein","hem","hep","hi","ho","holà","hop","hormis","hors","hou","houp","hue","hui","huit","huitième","hum","hurrah","hé","hélas","i","il","ils","importe","j","je","jusqu","jusque","juste","k","l","la","laisser","laquelle","las","le","lequel","les","lesquelles","lesquels","leur","leurs","longtemps","lors","lorsque","lui","lui-meme","lui-même","là","lès","m","ma","maint","maintenant","mais","malgre","malgré","maximale","me","meme","memes","merci","mes","mien","mienne","miennes","miens","mille","mince","minimale","moi","moi-meme","moi-même","moindres","moins","mon","moyennant","multiple","multiples","même","mêmes","n","na","naturel","naturelle","naturelles","ne","neanmoins","necessaire","necessairement","neuf","neuvième","ni","nombreuses","nombreux","non","nos","notamment","notre","nous","nous-mêmes","nouveau","nul","néanmoins","nôtre","nôtres","o","oh","ohé","ollé","olé","on","ont","onze","onzième","ore","ou","ouf","ouias","oust","ouste","outre","ouvert","ouverte","ouverts","o|","où","p","paf","pan","par","parce","parfois","parle","parlent","parler","parmi","parseme","partant","particulier","particulière","particulièrement","pas","passé","pendant","pense","permet","personne","peu","peut","peuvent","peux","pff","pfft","pfut","pif","pire","plein","plouf","plus","plusieurs","plutôt","possessif","possessifs","possible","possibles","pouah","pour","pourquoi","pourrais","pourrait","pouvait","prealable","precisement","premier","première","premièrement","pres","probable","probante","procedant","proche","près","psitt","pu","puis","puisque","pur","pure","q","qu","quand","quant","quant-à-soi","quanta","quarante","quatorze","quatre","quatre-vingt","quatrième","quatrièmement","que","quel","quelconque","quelle","quelles","quelqu'un","quelque","quelques","quels","qui","quiconque","quinze","quoi","quoique","r","rare","rarement","rares","relative","relativement","remarquable","rend","rendre","restant","reste","restent","restrictif","retour","revoici","revoilà","rien","s","sa","sacrebleu","sait","sans","sapristi","sauf","se","sein","seize","selon","semblable","semblaient","semble","semblent","sent","sept","septième","sera","seraient","serait","seront","ses","seul","seule","seulement","si","sien","sienne","siennes","siens","sinon","six","sixième","soi","soi-même","soit","soixante","son","sont","sous","souvent","specifique","specifiques","speculatif","stop","strictement","subtiles","suffisant","suffisante","suffit","suis","suit","suivant","suivante","suivantes","suivants","suivre","superpose","sur","surtout","t","ta","tac","tant","tardive","te","tel","telle","tellement","telles","tels","tenant","tend","tenir","tente","tes","tic","tien","tienne","tiennes","tiens","toc","toi","toi-même","ton","touchant","toujours","tous","tout","toute","toutefois","toutes","treize","trente","tres","trois","troisième","troisièmement","trop","très","tsoin","tsouin","tu","té","u","un","une","unes","uniformement","unique","uniques","uns","v","va","vais","vas","vers","via","vif","vifs","vingt","vivat","vive","vives","vlan","voici","voilà"]  
}

function onOpen(e) {
  
  var ui = DocumentApp.getUi();
  var menu = ui.createAddonMenu();
  
  menu.addItem('Get '+GLOBAL.main_term,'run_app').addToUi();
  
}


function url_test(){
 var response = UrlFetchApp.fetch("https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc")

  
}



function onInstall(e) {
  onOpen(e);
}


function run_app () {
  try
  {
    DocumentApp.getUi().showSidebar(HtmlService.createTemplateFromFile("UI").evaluate().setTitle(GLOBAL.main_term+" Finder").setWidth(290).setSandboxMode(HtmlService.SandboxMode.IFRAME));
  }
  catch(e)
   {
     var msg="Error. Please re-try."
     DocumentApp.getUi().alert(msg);
   
   }
    return;
}


function main() {
  
 
  var query=[]
  var selection = getSelection() //returns the selection in an array with one element
  Logger.log(selection)
  if(selection.length>0){
     
    var string = make_eligible_words(selection)//drops common words and returns a string example: achieved+basic+target
    var obj = contextual_search_adapter (selection)
    Logger.log(obj)
   // var obj = news_api_adapter (selection);      
    //var obj = github_api_adapter(selection)
    if(obj[1].length>0){
      query ={term:string,results:obj[1],application_name:obj[0]}
    }
    else{
     query =  {term:string,results:false,application_name:obj[0]}
    }
  }
  else{
   query={term:selection,results:[]}
  }

  
  return query;
  
}

  function getSelection()
  {  
  
  var selection=DocumentApp.getActiveDocument().getSelection(); 
  if (selection !=null)
    {
    var elements = selection.getRangeElements(); 
    var selectedText=[];
    
  
    for (var i in elements) 
    {
      
      // look at elements that are text (i.e a  partial paragraph) or a full paragraph
      if (elements[i].getElement().getType()== DocumentApp.ElementType.TEXT || elements[i].getElement().getType()== DocumentApp.ElementType.PARAGRAPH  ) 
      {
        
        if (elements[i].isPartial()) /* Determines whether this range element covers the entire element or a partial selection of the element's characters. */
        {
         
          var start =elements[i].getStartOffset();
          var end = elements[i].getEndOffsetInclusive()+1; /* Gets the position of the start and end of a partial range within the range element.*/     
          var candidate = elements[i].getElement().asText().getText().slice(start,end);
   
        }
        
        else 
        {
          
          var candidate =elements[i].getElement().asText().getText();  
        
          }
          
        if (candidate.trim().length >0)
          {
            selectedText.push(candidate.trim()); 
           
        }
        
      }  
    }

  }
  else
  {
    
    selectedText =[];
  }
  
     
  selectedText=cleanSelection(selectedText);

  return selectedText;

}

function make_eligible_words(selection){
  
  if(selection.length>1){
  var max_words=4 
  //var selection = ' wrapper around an Element with a possible start and end offset. These offsets allow a range of characters within a Text element to be represented in search results, document selections, and named ranges'
   var word_sets = genFd(selection)
   var clean_word_set = removeSelectedWords(word_sets)
   

   var edited_word_set = clean_word_set.length >0 ? clean_word_set : word_sets

   var num = edited_word_set.length > max_words ? max_words : edited_word_set.length
   var string=edited_word_set[0]["text"]
   for (var i=1; i<num; i++){
    string=string+'+'+edited_word_set[i]["text"] 
     
   }
  }
  else{
   string =selection 
  }

  return string
}

function genFd(document)
{
     //Logger.log(document)
      var words = (function()
    {
       
       
       document=document.replace(/[\W]/g," ");
       document=document.replace(/[0-9]/g,""); // for now will drop words with any numbers
        
        var regexes = {goog_delimters : /\s|\^|\n|\!|\@|\[|\]|\#|\$|\%|\&|\*|\?|\+|\=|\–|\_|\(|\)|\:|\;|\—|\,|\.|\]|\}|\{|”|\//};
        var sWords=document.toLowerCase().trim();
      
      
        sWords = sWords.split(regexes["goog_delimters"]).sort(); 
        var arr=[];
        for (var i in sWords)
        {
          if (sWords[i].length>0)
          {
            arr.push(sWords[i])
          }
        
        }

        sWords=arr;
        //sWords = sWords.split(/[\s\/]+/g).sort();
        
         
        
        var iWordsCount = sWords.length; // count w/ duplicates
     
        
        var ignore =[];

        var counts = {}; 
        for (var i=0; i<iWordsCount; i++) {
                var sWord = sWords[i];
            
                 
                
                counts[sWord] = counts[sWord] || 0;
               
                counts[sWord]++;

        }
    
        var arr = []; // an array of objects to return
        for (sWord in counts) {
            arr.push({
                text: sWord,
                weight: counts[sWord]
             
    
        });
        
        }
        // sort array by descending frequency 
        return arr.sort(function(a,b){
            return (a.weight > b.weight) ? -1 : ((a.weight < b.weight) ? 1 : 0);
        });
    
    }());

    return words; 


}


 function removeSelectedWords(allWords) //if allWords is in an array of maps like so [{text: "hello", weight: 15},{text: "some", weight: 10}]
{
  var ignore=GLOBAL.du_ger_dan_eng_fr
  var o = {}; // object prop checking > in array checking
  var iCount = ignore.length;
 
  for (var i=0;i<iCount;i++){
    o[ignore[i]] = true;
  }

  var allWordsCount = allWords.length; // count w/ duplicates
  var cleanWords = []; 
  for (var i=0; i<allWordsCount; i++) {
    var sWord = allWords[i]["text"];
    if (!o[allWords[i]["text"]])
    {
      cleanWords.push({text: allWords[i]["text"],weight: allWords[i]["weight"]}); 
      
    }

  }
 
 return cleanWords;

}





function get_topic(){
 return GLOBAL.main_term; 
}

function cleanSelection(selectedText)
{
  
  var text=[];

  for (var i in selectedText)
  {
    var selText=selectedText[i].replace(/\n|\'|\!|\@|\#|\$\|\%|\^|\&|\~|\`|\>|\<|\?|\"|\%|\,|\;|\:|\(|\)|\:|\;|\.|\]|\]|\}|\/|\"|\{|\“|\"\'|\*/g,"");
    text.push(selText);
  }
  
   
  return text[0];

}





function insertLink(link,title)
{
  
  
  
  var selection = DocumentApp.getActiveDocument().getSelection();
  
  if (selection!=null)
  {
    var elements=selection.getRangeElements()
    
    for (var i = 0; i < elements.length; i++) 
    {
      if(elements[i].getElement().getType()== DocumentApp.ElementType.TEXT || elements[i].getElement().getType()== DocumentApp.ElementType.PARAGRAPH || elements[i].getElement().getType()== DocumentApp.ElementType.INLINE_IMAGE)
      {
         var element = elements[i];
         
         if (element.getElement().editAsText) {
           
           
           if (element.isPartial()) 
           {
             
              var start=element.getStartOffset();
              var end=element.getEndOffsetInclusive();
              
              element.getElement().asText().setLinkUrl(start,end,link);
          
            }
            else
            {
              
                
                if (selection.getRangeElements().length >1){
                  elements[i].getElement().asText().setLinkUrl(link);
                }
                else
                {
                
                for (var i = 0; i < elements.length; i++) {
                  DocumentApp.getActiveDocument().getSelection().getRangeElements()[i].getElement().asText().setText(title).setLinkUrl(link);               
                 }             
                } 
            }          
          }
          
          if (elements[i].getElement().getType()==DocumentApp.ElementType.INLINE_IMAGE)
          {
           
            DocumentApp.getActiveDocument().getSelection().getRangeElements()[i].getElement().asInlineImage().setLinkUrl(link);
                 
          
          }
          

          
       }
       
    }
  }
  else
  {
    var cursor = DocumentApp.getActiveDocument().getCursor();
    if (cursor!=null)
    {
      cursor.insertText(title).setLinkUrl(link);
      
      
    
    }
   
  
  }

  

  
}





