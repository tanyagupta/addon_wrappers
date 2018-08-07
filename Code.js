function onOpen(e) {
  
  var ui = DocumentApp.getUi();
  var menu = ui.createAddonMenu();
  
  menu.addItem('Get News','run_app').addToUi();
  
}


function onInstall(e) {
  onOpen(e);
}


function run_app () {
  try
  {
    DocumentApp.getUi().showSidebar(HtmlService.createTemplateFromFile("UI").evaluate().setTitle("Get News").setWidth(290).setSandboxMode(HtmlService.SandboxMode.IFRAME));
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
  var term = getSelection()
  
  if(term.length>0){
    var text = make_eligible_words(term[0])
    var news = news_api_adapter (text);
    query ={term:text,results:news}
   }
  else{
   query={term:term,results:[]}
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

  //Logger.log(selectedText)
  return selectedText;

}

function make_eligible_words(document){
  
  if(document.length>1){
  var max_words=4 
  //var document = ' wrapper around an Element with a possible start and end offset. These offsets allow a range of characters within a Text element to be represented in search results, document selections, and named ranges'
   var word_sets = genFd(document)
   

   var edited_word_sets = removeSelectedWords(word_sets)

   var num = edited_word_sets.length > max_words ? max_words : edited_word_sets.length
   var string=edited_word_sets[0]["text"]
   for (var i=1; i<num; i++){
    string=string+'+'+edited_word_sets[i]["text"] 
     
   }
  }
  else{
   string =document 
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
  var ignore=du_ger_dan_eng_fr
 // Logger.log(ignore)
  var o = {}; // object prop checking > in array checking
  var iCount = ignore.length;
 
  for (var i=0;i<iCount;i++){
    o[ignore[i]] = true;
  }

  var allWordsCount = allWords.length; // count w/ duplicates
  //Logger.log(allWordsCount);
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


var du_ger_dan_eng_fr=["af","alle","andet","andre","at","begge","da","de","den","denne","der","deres","det","dette","dig","din","dog","du","ej","eller","en","end","ene","eneste","enhver","et","fem",
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
              "avais","avait","avant","avec","avoir","avons","ayant","b","bah","bas","basee","bat","beau","beaucoup","bien","bigre","boum","bravo","brrr","c","car","ce","ceci","cela","celle","celle-ci","celle-là","celles","celles-ci","celles-là","celui","celui-ci","celui-là","cent","cependant","certain","certaine","certaines","certains","certes","ces","cet","cette","ceux","ceux-ci","ceux-là","chacun","chacune","chaque","cher","chers","chez","chiche","chut","chère","chères","ci","cinq","cinquantaine","cinquante","cinquantième","cinquième","clac","clic","combien","comme","comment","comparable","comparables","compris","concernant","contre","couic","crac","d","da","dans","de","debout","dedans","dehors","deja","delà","depuis","dernier","derniere","derriere","derrière","des","desormais","desquelles","desquels","dessous","dessus","deux","deuxième","deuxièmement","devant","devers","devra","different","differentes","differents","différent","différente","différentes","différents","dire","directe","directement","dit","dite","dits","divers","diverse","diverses","dix","dix-huit","dix-neuf","dix-sept","dixième","doit","doivent","donc","dont","douze","douzième","dring","du","duquel","durant","dès","désormais","e","effet","egale","egalement","egales","eh","elle","elle-même","elles","elles-mêmes","en","encore","enfin","entre","envers","environ","es","est","et","etant","etc","etre","eu","euh","eux","eux-mêmes","exactement","excepté","extenso","exterieur","f","fais","faisaient","faisant","fait","façon","feront","fi","flac","floc","font","g","gens","h","ha","hein","hem","hep","hi","ho","holà","hop","hormis","hors","hou","houp","hue","hui","huit","huitième","hum","hurrah","hé","hélas","i","il","ils","importe","j","je","jusqu","jusque","juste","k","l","la","laisser","laquelle","las","le","lequel","les","lesquelles","lesquels","leur","leurs","longtemps","lors","lorsque","lui","lui-meme","lui-même","là","lès","m","ma","maint","maintenant","mais","malgre","malgré","maximale","me","meme","memes","merci","mes","mien","mienne","miennes","miens","mille","mince","minimale","moi","moi-meme","moi-même","moindres","moins","mon","moyennant","multiple","multiples","même","mêmes","n","na","naturel","naturelle","naturelles","ne","neanmoins","necessaire","necessairement","neuf","neuvième","ni","nombreuses","nombreux","non","nos","notamment","notre","nous","nous-mêmes","nouveau","nul","néanmoins","nôtre","nôtres","o","oh","ohé","ollé","olé","on","ont","onze","onzième","ore","ou","ouf","ouias","oust","ouste","outre","ouvert","ouverte","ouverts","o|","où","p","paf","pan","par","parce","parfois","parle","parlent","parler","parmi","parseme","partant","particulier","particulière","particulièrement","pas","passé","pendant","pense","permet","personne","peu","peut","peuvent","peux","pff","pfft","pfut","pif","pire","plein","plouf","plus","plusieurs","plutôt","possessif","possessifs","possible","possibles","pouah","pour","pourquoi","pourrais","pourrait","pouvait","prealable","precisement","premier","première","premièrement","pres","probable","probante","procedant","proche","près","psitt","pu","puis","puisque","pur","pure","q","qu","quand","quant","quant-à-soi","quanta","quarante","quatorze","quatre","quatre-vingt","quatrième","quatrièmement","que","quel","quelconque","quelle","quelles","quelqu'un","quelque","quelques","quels","qui","quiconque","quinze","quoi","quoique","r","rare","rarement","rares","relative","relativement","remarquable","rend","rendre","restant","reste","restent","restrictif","retour","revoici","revoilà","rien","s","sa","sacrebleu","sait","sans","sapristi","sauf","se","sein","seize","selon","semblable","semblaient","semble","semblent","sent","sept","septième","sera","seraient","serait","seront","ses","seul","seule","seulement","si","sien","sienne","siennes","siens","sinon","six","sixième","soi","soi-même","soit","soixante","son","sont","sous","souvent","specifique","specifiques","speculatif","stop","strictement","subtiles","suffisant","suffisante","suffit","suis","suit","suivant","suivante","suivantes","suivants","suivre","superpose","sur","surtout","t","ta","tac","tant","tardive","te","tel","telle","tellement","telles","tels","tenant","tend","tenir","tente","tes","tic","tien","tienne","tiennes","tiens","toc","toi","toi-même","ton","touchant","toujours","tous","tout","toute","toutefois","toutes","treize","trente","tres","trois","troisième","troisièmement","trop","très","tsoin","tsouin","tu","té","u","un","une","unes","uniformement","unique","uniques","uns","v","va","vais","vas","vers","via","vif","vifs","vingt","vivat","vive","vives","vlan","voici","voilà"];  





function cleanSelection(selectedText)
{
 
  var text=[];

  for (var i in selectedText)
  {
    var selText=selectedText[i].replace(/\n|\'|\!|\@|\#|\$\|\%|\^|\&|\~|\`|\>|\<|\?|\"|\%|\,|\;|\:|\(|\)|\:|\;|\.|\]|\]|\}|\/|\"|\{|\“|\"\'|\*/g,"");
    text.push(selText);
  }
  
  
  
  //log(text)
  return text;

}




/*


Receives an array of string (of any length). Each string reprsents a potential topic. 

Note: 11/10/2014

For this submission we will just use a single phrase to get news. We will combine all of the phrases to a single phrase.
In the Addon we expect it will usaully have only one entry.
We will submit the topic and request 8 items only. 

refernece: https://developers.google.com/news-search/v1/jsondevguide?csw=1#request_format


We store the result in our news structure. 

 [{topic=Moxxxo, news=[]}]

This way we also know what topic we had submitted. Currently the array should contain only one element and is superfluous.


/* assume all news is the array of the new data structure
Title: A short string
See Also: URL
Parent: String
Image: URL
Source: URL
Content: Big String

*/

//{"status":"ok","totalResults":4,"articles":[{"source":{"id":null,"name":"Slashdot.org"},"author":"Bitcoin of America","title":"Digital Currency outside of the United States","description":"Bitcoin is a phenomenon, which is creating conflicting emotions among many around the world. With this new concept, many seem to be elated, excited, worried, and in doubt. Governments are facing a whole lot of pressure to regulate this new currency system. We…","url":"https://slashdot.org/submission/8451910/digital-currency-outside-of-the-united-states","urlToImage":null,"publishedAt":"2018-08-03T11:55:28Z"},{"source":{"id":null,"name":"Slashdot.org"},"author":"Anonymous Coward","title":"Best bitcoin news | bitcoin latest news","description":"Bitcoin is known as the first scattered digital currency. They are basically coins that can be sent over the Internet. 2009 was the year bitcoin latest news today when Bitcoin was born. The creator’s name is unknown, but the alias Satoshi Nakamoto is given to…","url":"https://slashdot.org/submission/8448082/best-bitcoin-news--bitcoin-latest-news","urlToImage":null,"publishedAt":"2018-08-02T12:07:22Z"},{"source":{"id":null,"name":"Youbrandinc.com"},"author":"Scott Scanlon","title":"Bitcoin (BTC) Technical Analysis: It’s an IPO for Bitmain and a blow for BitcoinBitcoin (BTC) Technical Analysis: It’s an IPO for Bitmain and a blow for Bitcoin","description":"Finally, there is a pump of demand as far as Bitcoin (BTC) price action goes. Bitcoin is trading above $6,500 and odds are we might see further gains this week after week ending July 8 bullish confirmation and push above $6,000. In any case, technical formati…","url":"https://www.youbrandinc.com/crytocurrency/bitcoin-btc-technical-analysis-its-an-ipo-for-bitmain-and-a-blow-for-bitcoinbitcoin-btc-technical-analysis-its-an-ipo-for-bitmain-and-a-blow-for-bitcoin/","urlToImage":"https://www.youbrandinc.com/wp-content/uploads/2018/07/Bitcoin-price-technical-analysis-2-1.png","publishedAt":"2018-07-09T07:03:18Z"},{"source":{"id":null,"name":"Bleepingcomputer.com"},"author":"ergrgergreg","title":"Bitcoin SuPpOrt 18005716109 Bitcoin","description":"Bitcoin SuPpOrt 18005716109 Bitcoin - posted in Windows 10 Support: Bitcoin SuPpOrt 18005716109 Bitcoin\n \nBitcoin SuPpOrt 18005716109 Bitcoin\n \nBitcoin SuPpOrt 18005716109 Bitcoin\n \nBitcoin SuPpOrt 18005716109 Bitcoin\n \nBitcoin SuPpOrt 18005716109 Bitcoin\n \nB…","url":"https://www.bleepingcomputer.com/forums/t/673721/bitcoin-support-18005716109-bitcoin/","urlToImage":"https://www.bleepingcomputer.com/forums/public/style_images/master/meta_image.png","publishedAt":"2018-03-21T15:46:13Z"}]}
function news_api_adapter (text){
  
  var url = 'https://newsapi.org/v2/everything?q='+text+'&sortBy=publishedAt&apiKey=cb631de235df4efd8362ae5b268f0f78';
  var articles= JSON.parse(UrlFetchApp.fetch(url))['articles']
  
  //var articles = JSON.parse(UrlFetchApp.fetch('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=cb631de235df4efd8362ae5b268f0f78'))['articles']  /* server endpoint down delete later */
  
  

  var adapted_news_obj=[]
  

  for (var i in articles){
    var temp={};
    temp['title']= articles[i]['title'] || "No title";
    temp['source'] = articles[i]['url'] || 'No source';
    temp['see_also'] = articles[i]['url'] || 'No related';
    temp['image'] = articles[i]['urlToImage'] || 'http://www.rockvalleytruck.com/image/cache/placeholder-200x200.png';
    temp['source'] = articles[i]['url'] || "No source";
    temp['parent'] = articles[i]['source']['name'] || "No name"
    temp['content'] = articles[i]['description'] || "No description"
    
    adapted_news_obj.push(temp)
  }
 // Logger.log(adapted_news_obj);
  return adapted_news_obj

}
 

function getNewsItems() {
  
  var res = [{   
   "see_also": "http://news.google.com/news/story?ncl\u003ddHLAgXM_3xkk1UMqmBLIxMHMlfAEMu0026hl\u003den\u0026ned\u003dus",
   "content": "By MIRIAM JORDAN President \u003cb\u003eBarackObama\u003c/b\u003e enjoys a higher approval rating among Hispanics than among the general electorate, according to a new poll, \u003cb\u003e...\u003c/b\u003e",
   "source": "http%3A%2F%2Fonline.wsj.com%2Farticle%2FSB10001424052748703580904575132022909364834.html%3Fmod%3Dgooglenews_wsj",
   "title": "Poll Notes Concern Among Hispanic Voters on Immigration",
   "parent": "Wall Street Journal",
   "image": "data:image/jpeg;base64,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"
   },
   {
   "see_also": "http://news.google.com/news/story?ncl\u003ddqqF9LoG7f1UpYMtbeIU6_12F9KTM\u0026hl\u003den\u0026ned\u003dus",
   "content": "President \u003cb\u003eBarack Obama\u003c/b\u003e would give federal authorities the power to block unreasonable rate hikes. President \u003cb\u003eBarack Obama\u003c/b\u003e delivers remarks on health \u003cb\u003e...\u003c/b\u003e",   
   "source": "http%3A%2F%2Fabcnews.go.com%2FBusiness%2FwireStory%3Fid%3D10150795",
   "title": "Final Health Bill Omits Some of \u003cb\u003eObama\u0026#39;s\u003c/b\u003e Promises",
   "parent": "ABC News",
   "image":"https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/President_Barack_Obama,_2012_portrait_crop.jpg/200px-President_Barack_Obama,_2012_portrait_crop.jpg"
    
   }]
  
  return res
  

    
}

//function test(title)
//{
//  return title
//  
//}

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






  /* call adapter from here for #3 */
/*
  var allNews=[]; // will contain only one element in this vers
  var topic="Blah";
   var answer = 
{"responseData": {
 "results": [
  {
   "GsearchResultClass": "GnewsSearch",
   "clusterUrl": "http://news.google.com/news/story?ncl\u003ddHLAgXM_3xkk1UMqmBLIxMHMlfAEMu0026hl\u003den\u0026ned\u003dus",
   "content": "By MIRIAM JORDAN President \u003cb\u003eBarackObama\u003c/b\u003e enjoys a higher approval rating among Hispanics than among the general electorate, according to a new poll, \u003cb\u003e...\u003c/b\u003e",
   "unescapedUrl": "http://online.wsj.com/article/SB10001424052748703580904575132022909364834.html?mod\u003dgooglenews_wsj",
   "url": "http%3A%2F%2Fonline.wsj.com%2Farticle%2FSB10001424052748703580904575132022909364834.html%3Fmod%3Dgooglenews_wsj",
   "title": "Poll Notes Concern Among Hispanic Voters on Immigration",
   "titleNoFormatting": "Poll Notes Concern Among Hispanic Voters on Immigration",
   "location": "",
   "publisher": "Wall Street Journal",
   "publishedDate": "Fri, 19 Mar 2010 13:26:35 -0700",
   "signedRedirectUrl": "http://news.google.com/news/url?sa\u003dT\u0026ct\u003dus/0-0-0\u0026fd\u003dS\u0026url\u003dhttp://online.wsj.com/article/SB10001424052748703580904575132022909364834.html%3Fmod%3Dgooglenews_wsj\u0026cid\u003d17593726372699\u0026ei\u003dE_ejS_CcBoqQrQOwv8qgAw\u0026usg\u003dAFQjCNE3uhgwmOvcJSd444eShCYZvNxjnw",
   "language": "en",
   "image": {
    "url": "http://media3.washingtonpost.com/wp-dyn/content/photo/2010/03/19/PH2010031900383.jpg",
    "tbUrl": "http://nt3.ggpht.com/news/tbn/3xVeEFy849oJ",
    "originalContextUrl": "http://www.washingtonpost.com/wp-dyn/content/article/2010/03/19/AR2010031900381.html",
    "publisher": "Washington Post",
    "tbWidth": 80,
    "tbHeight": 54
   },
   "relatedStories": [
    {
     "unescapedUrl": "http://www.washingtonpost.com/wp-dyn/content/article/2010/03/19/AR2010031901566.html",
     "url": "http%3A%2F%2Fwww.washingtonpost.com%2Fwp-dyn%2Fcontent%2Farticle%2F2010%2F03%2F19%2FAR2010031901566.html",
     "title": "Latinos press \u003cb\u003eObama\u003c/b\u003e to deliver immigration reform",
     "titleNoFormatting": "Latinos press Obama to deliver immigration reform",
     "location": "",
     "publisher": "Washington Post",
     "publishedDate": "Fri, 19 Mar 2010 09:18:17 -0700",
     "signedRedirectUrl": "http://news.google.com/news/url?sa\u003dT\u0026ct\u003dus/0-0-1\u0026fd\u003dS\u0026url\u003dhttp://www.washingtonpost.com/wp-dyn/content/article/2010/03/19/AR2010031901566.html\u0026cid\u003d17593726372699\u0026ei\u003dE_ejS_CcBoqQrQOwv8qgAw\u0026usg\u003dAFQjCNEaln8We-E_DOZ_uiy0c11QnhJung",
     "language": "en"
    },
    {
     "unescapedUrl": "http://abcnews.go.com/Business/wireStory?id\u003d10144730",
     "url": "http%3A%2F%2Fabcnews.go.com%2FBusiness%2FwireStory%3Fid%3D10144730",
     "title": "PROMISES, PROMISES: \u003cb\u003eObama\u003c/b\u003e in Immigration Dance",
     "titleNoFormatting": "PROMISES, PROMISES: Obama in Immigration Dance",
     "location": "",
     "publisher": "ABC News",
     "publishedDate": "Fri, 19 Mar 2010 00:49:30 -0700",
     "signedRedirectUrl": "http://news.google.com/news/url?sa\u003dT\u0026ct\u003dus/0-0-2\u0026fd\u003dS\u0026url\u003dhttp://abcnews.go.com/Business/wireStory%3Fid%3D10144730\u0026cid\u003d17593726372699\u0026ei\u003dE_ejS_CcBoqQrQOwv8qgAw\u0026usg\u003dAFQjCNEYoIVgKYkEat0-8L9DmD2ZwNRxBQ",
     "language": "en"
    },
    {
     "unescapedUrl": "http://www.pressdemocrat.com/article/20100319/NEWS/3191099/1348",
     "url": "http%3A%2F%2Fwww.pressdemocrat.com%2Farticle%2F20100319%2FNEWS%2F3191099%2F1348",
     "title": "\u003cb\u003eObama\u003c/b\u003e backs new congressional \u0026#39;blueprint\u0026#39; for immigration law",
     "titleNoFormatting": "Obama backs new congressional \u0026#39;blueprint\u0026#39; for immigration law",
     "location": "",
     "publisher": "Santa Rosa Press Democrat",
     "publishedDate": "Fri, 19 Mar 2010 09:04:25 -0700",
     "signedRedirectUrl": "http://news.google.com/news/url?sa\u003dT\u0026ct\u003dus/0-0-3\u0026fd\u003dS\u0026url\u003dhttp://www.pressdemocrat.com/article/20100319/NEWS/3191099/1348\u0026cid\u003d17593726372699\u0026ei\u003dE_ejS_CcBoqQrQOwv8qgAw\u0026usg\u003dAFQjCNFQmLI5y3j1s0KESoC3f8nbkpYZnA",
     "language": "en"
    },
    {
     "unescapedUrl": "http://blogs.wsj.com/washwire/2010/03/19/sen-graham-immigration-will-be-casualty-of-health-bill/",
     "url": "http%3A%2F%2Fblogs.wsj.com%2Fwashwire%2F2010%2F03%2F19%2Fsen-graham-immigration-will-be-casualty-of-health-bill%2F",
     "title": "Sen. Graham: \u0026#39;Immigration Will Be Casualty of Health Bill\u0026#39;",
     "titleNoFormatting": "Sen. Graham: \u0026#39;Immigration Will Be Casualty of Health Bill\u0026#39;",
     "location": "",
     "publisher": "Wall Street Journal (blog)",
     "publishedDate": "Fri, 19 Mar 2010 14:00:12 -0700",
     "signedRedirectUrl": "http://news.google.com/news/url?sa\u003dT\u0026ct\u003dus/0-0-4\u0026fd\u003dS\u0026url\u003dhttp://blogs.wsj.com/washwire/2010/03/19/sen-graham-immigration-will-be-casualty-of-health-bill/\u0026cid\u003d17593726372699\u0026ei\u003dE_ejS_CcBoqQrQOwv8qgAw\u0026usg\u003dAFQjCNGD2kkQJD-PmwMk04MelzMJWMDySA",
     "language": "en"
    },
    {
     "unescapedUrl": "http://www.google.com/hostednews/ap/article/ALeqM5hrL7yuyUVclkim1xKb98eQ35qHxQD9EHA1780",
     "url": "http%3A%2F%2Fwww.google.com%2Fhostednews%2Fap%2Farticle%2FALeqM5hrL7yuyUVclkim1xKb98eQ35qHxQD9EHA1780",
     "title": "\u003cb\u003eObama\u003c/b\u003e backs senators immigration overhaul outline",
     "titleNoFormatting": "Obama backs senators immigration overhaul outline",
     "location": "",
     "publisher": "The Associated Press",
     "publishedDate": "Thu, 18 Mar 2010 15:19:43 -0700",
     "signedRedirectUrl": "http://news.google.com/news/url?sa\u003dT\u0026ct\u003dus/0-0-5\u0026fd\u003dS\u0026url\u003dhttp://www.google.com/hostednews/ap/article/ALeqM5hrL7yuyUVclkim1xKb98eQ35qHxQD9EHA1780\u0026cid\u003d17593726372699\u0026ei\u003dE_ejS_CcBoqQrQOwv8qgAw\u0026usg\u003dAFQjCNEPE-SDaHQkuQtaN8N5Yqiqyqf8Ng",
     "language": "en"
    },
    {
     "unescapedUrl": "http://rawstory.com/news/afp/US_health_overhaul_would_doom_immig_03192010.html",
     "url": "http%3A%2F%2Frawstory.com%2Fnews%2Fafp%2FUS_health_overhaul_would_doom_immig_03192010.html",
     "title": "US health overhaul would doom immigration plan: senator",
     "titleNoFormatting": "US health overhaul would doom immigration plan: senator",
     "location": "",
     "publisher": "Raw Story",
     "publishedDate": "Fri, 19 Mar 2010 13:59:41 -0700",
     "signedRedirectUrl": "http://news.google.com/news/url?sa\u003dT\u0026ct\u003dus/0-0-6\u0026fd\u003dS\u0026url\u003dhttp://rawstory.com/news/afp/US_health_overhaul_would_doom_immig_03192010.html\u0026cid\u003d17593726372699\u0026ei\u003dE_ejS_CcBoqQrQOwv8qgAw\u0026usg\u003dAFQjCNE0eh8KrbPhl3ikj9-_NL_CdGmtZg",
     "language": "en"
    }
   ]
  },
  {
   "GsearchResultClass": "GnewsSearch",
   "clusterUrl": "http://news.google.com/news/story?ncl\u003ddqqF9LoG7f1UpYMtbeIU6_12F9KTM\u0026hl\u003den\u0026ned\u003dus",
   "content": "President \u003cb\u003eBarack Obama\u003c/b\u003e would give federal authorities the power to block unreasonable rate hikes. President \u003cb\u003eBarack Obama\u003c/b\u003e delivers remarks on health \u003cb\u003e...\u003c/b\u003e",
   "unescapedUrl": "http://abcnews.go.com/Business/wireStory?id\u003d10150795",
   "url": "http%3A%2F%2Fabcnews.go.com%2FBusiness%2FwireStory%3Fid%3D10150795",
   "title": "Final Health Bill Omits Some of \u003cb\u003eObama\u0026#39;s\u003c/b\u003e Promises",
   "titleNoFormatting": "Final Health Bill Omits Some of Obama\u0026#39;s Promises",
   "location": "",
   "publisher": "ABC News",
   "publishedDate": "Fri, 19 Mar 2010 13:15:07 -0700",
   "signedRedirectUrl": "http://news.google.com/news/url?sa\u003dT\u0026ct\u003dus/0-1-0\u0026fd\u003dS\u0026url\u003dhttp://abcnews.go.com/Business/wireStory%3Fid%3D10150795\u0026cid\u003d17593727320867\u0026ei\u003dE_ejS_CcBoqQrQOwv8qgAw\u0026usg\u003dAFQjCNHKi4kgGfSrGAWKxVKKv52pYYlMcw",
   "language": "en",
   "image": {
    "url": "http://a.abcnews.com/images/Politics/apg_obama_health_congress_100319_mn.jpg",
    "tbUrl": "http://nt0.ggpht.com/news/tbn/APcDaPD-2JsJ",
    "originalContextUrl": "http://abcnews.go.com/WN/monday-morning-state-americas-health-care-world-news/story?id\u003d10146233",
    "publisher": "ABC News",
    "tbWidth": 80,
    "tbHeight": 60
   },
   "relatedStories": [
    {
     "unescapedUrl": "http://www.reuters.com/article/idUSN1915103720100319",
     "url": "http%3A%2F%2Fwww.reuters.com%2Farticle%2FidUSN1915103720100319",
     "title": "\u003cb\u003eObama\u003c/b\u003e optimistic on weekend healthcare vote",
     "titleNoFormatting": "Obama optimistic on weekend healthcare vote",
     "location": "",
     "publisher": "Reuters",
     "publishedDate": "Fri, 19 Mar 2010 09:13:32 -0700",
     "signedRedirectUrl": "http://news.google.com/news/url?sa\u003dT\u0026ct\u003dus/0-1-1\u0026fd\u003dS\u0026url\u003dhttp://www.reuters.com/article/idUSN1915103720100319\u0026cid\u003d17593727320867\u0026ei\u003dE_ejS_CcBoqQrQOwv8qgAw\u0026usg\u003dAFQjCNH42J0Z1-UiaA_dfQmezghogxmIXA",
     "language": "en"
    },
    {
     "unescapedUrl": "http://www.washingtonpost.com/wp-dyn/content/article/2010/03/19/AR2010031900368.html",
     "url": "http%3A%2F%2Fwww.washingtonpost.com%2Fwp-dyn%2Fcontent%2Farticle%2F2010%2F03%2F19%2FAR2010031900368.html",
     "title": "\u003cb\u003eObama\u003c/b\u003e to Dems: Our fates are tied to health bill",
     "titleNoFormatting": "Obama to Dems: Our fates are tied to health bill",
     "location": "",
     "publisher": "Washington Post",
     "publishedDate": "Fri, 19 Mar 2010 00:50:48 -0700",
     "signedRedirectUrl": "http://news.google.com/news/url?sa\u003dT\u0026ct\u003dus/0-1-2\u0026fd\u003dS\u0026url\u003dhttp://www.washingtonpost.com/wp-dyn/content/article/2010/03/19/AR2010031900368.html\u0026cid\u003d17593727320867\u0026ei\u003dE_ejS_CcBoqQrQOwv8qgAw\u0026usg\u003dAFQjCNGXgOMBfyHiAPQ5pmNPJxzcDUa2Nw",
     "language": "en"
    },
    {
     "unescapedUrl": "http://news.bbc.co.uk/2/hi/americas/8577142.stm",
     "url": "http%3A%2F%2Fnews.bbc.co.uk%2F2%2Fhi%2Famericas%2F8577142.stm",
     "title": "\u003cb\u003eObama\u003c/b\u003e hails \u0026#39;historic\u0026#39; healthcare reform vote",
     "titleNoFormatting": "Obama hails \u0026#39;historic\u0026#39; healthcare reform vote",
     "location": "",
     "publisher": "BBC News",
     "publishedDate": "Fri, 19 Mar 2010 10:49:58 -0700",
     "signedRedirectUrl": "http://news.google.com/news/url?sa\u003dT\u0026ct\u003dus/0-1-3\u0026fd\u003dS\u0026url\u003dhttp://news.bbc.co.uk/2/hi/americas/8577142.stm\u0026cid\u003d17593727320867\u0026ei\u003dE_ejS_CcBoqQrQOwv8qgAw\u0026usg\u003dAFQjCNE98u__eD_Ku1Rob4qz_p1C156vVA",
     "language": "en"
    },
    {
     "unescapedUrl": "http://news.blogs.cnn.com/2010/03/19/obama-health-care-is-about-the-american-people/",
     "url": "http%3A%2F%2Fnews.blogs.cnn.com%2F2010%2F03%2F19%2Fobama-health-care-is-about-the-american-people%2F",
     "title": "\u003cb\u003eObama\u003c/b\u003e pushes \u0026#39;historic vote,\u0026#39; GOP leader vows to prevent it",
     "titleNoFormatting": "Obama pushes \u0026#39;historic vote,\u0026#39; GOP leader vows to prevent it",
     "location": "",
     "publisher": "CNN (blog)",
     "publishedDate": "Fri, 19 Mar 2010 08:39:00 -0700",
     "signedRedirectUrl": "http://news.google.com/news/url?sa\u003dT\u0026ct\u003dus/0-1-4\u0026fd\u003dS\u0026url\u003dhttp://news.blogs.cnn.com/2010/03/19/obama-health-care-is-about-the-american-people/\u0026cid\u003d17593727320867\u0026ei\u003dE_ejS_CcBoqQrQOwv8qgAw\u0026usg\u003dAFQjCNGJTqiFXdMfct93cTFZzAIhL2GcQw",
     "language": "en"
    },
    {
     "unescapedUrl": "http://www.businessweek.com/news/2010-03-19/obama-lobbies-for-support-as-health-care-vote-nears-update1-.html",
     "url": "http%3A%2F%2Fwww.businessweek.com%2Fnews%2F2010-03-19%2Fobama-lobbies-for-support-as-health-care-vote-nears-update1-.html",
     "title": "\u003cb\u003eObama\u003c/b\u003e Lobbies for Support as Health-Care Vote Nears",
     "titleNoFormatting": "Obama Lobbies for Support as Health-Care Vote Nears",
     "location": "",
     "publisher": "BusinessWeek",
     "publishedDate": "Fri, 19 Mar 2010 09:31:20 -0700",
     "signedRedirectUrl": "http://news.google.com/news/url?sa\u003dT\u0026ct\u003dus/0-1-5\u0026fd\u003dS\u0026url\u003dhttp://www.businessweek.com/news/2010-03-19/obama-lobbies-for-support-as-health-care-vote-nears-update1-.html\u0026cid\u003d17593727320867\u0026ei\u003dE_ejS_CcBoqQrQOwv8qgAw\u0026usg\u003dAFQjCNHGFwsgJO0JGRjFN4vRTWEKLG-wdQ",
     "language": "en"
    },
    {
     "unescapedUrl": "http://www.marketwatch.com/story/obama-to-push-health-care-bill-ahead-of-key-vote-2010-03-19",
     "url": "http%3A%2F%2Fwww.marketwatch.com%2Fstory%2Fobama-to-push-health-care-bill-ahead-of-key-vote-2010-03-19",
     "title": "\u003cb\u003eObama\u003c/b\u003e pushes health-care bill ahead of key vote",
     "titleNoFormatting": "Obama pushes health-care bill ahead of key vote",
     "location": "",
     "publisher": "MarketWatch",
     "publishedDate": "Fri, 19 Mar 2010 08:24:04 -0700",
     "signedRedirectUrl": "http://news.google.com/news/url?sa\u003dT\u0026ct\u003dus/0-1-6\u0026fd\u003dS\u0026url\u003dhttp://www.marketwatch.com/story/obama-to-push-health-care-bill-ahead-of-key-vote-2010-03-19\u0026cid\u003d17593727320867\u0026ei\u003dE_ejS_CcBoqQrQOwv8qgAw\u0026usg\u003dAFQjCNEULlTJZXUvDFVur2M2qPQsbiSaAg",
     "language": "en"
    }
   ]
  },
  {
   "GsearchResultClass": "GnewsSearch",
   "clusterUrl": "http://news.google.com/news/story?ncl\u003dd0m6ToHRyEIglNMIlaZxUpGcR2AyM\u0026hl\u003den\u0026ned\u003dus",
   "content": "A plan for the House Democratic caucus to meet with President \u003cb\u003eBarack Obama\u003c/b\u003e Saturday in the East Room of the White House has been changed. \u003cb\u003e...\u003c/b\u003e",
   "unescapedUrl": "http://blogs.wsj.com/washwire/2010/03/19/change-of-venue-obama-to-make-pitch-on-capitol-hill/",
   "url": "http%3A%2F%2Fblogs.wsj.com%2Fwashwire%2F2010%2F03%2F19%2Fchange-of-venue-obama-to-make-pitch-on-capitol-hill%2F",
   "title": "Change of Venue: \u003cb\u003eObama\u003c/b\u003e to Make Pitch on Capitol Hill",
   "titleNoFormatting": "Change of Venue: Obama to Make Pitch on Capitol Hill",
   "location": "",
   "publisher": "Wall Street Journal (blog)",
   "publishedDate": "Fri, 19 Mar 2010 14:12:26 -0700",
   "signedRedirectUrl": "http://news.google.com/news/url?sa\u003dT\u0026ct\u003dus/0-2-0\u0026fd\u003dS\u0026url\u003dhttp://blogs.wsj.com/washwire/2010/03/19/change-of-venue-obama-to-make-pitch-on-capitol-hill/\u0026cid\u003d17593728737966\u0026ei\u003dE_ejS_CcBoqQrQOwv8qgAw\u0026usg\u003dAFQjCNHYCG9yd2OjQT0DsRuH39We1TSFEg",
   "language": "en",
   "image": {
    "url": "http://media.kansascity.com/smedia/2010/03/17/21/70-Obama.sff.embedded.prod_affiliate.81.jpg",
    "tbUrl": "http://nt3.ggpht.com/news/tbn/_xzIDlmLExwJ",
    "originalContextUrl": "http://www.kansascity.com/2010/03/17/1819341/obama-appears-on-fox-news-long.html",
    "publisher": "Kansas City Star",
    "tbWidth": 80,
    "tbHeight": 51
   },
   "relatedStories": [
    {
     "unescapedUrl": "http://www.washingtonpost.com/wp-dyn/content/article/2010/03/19/AR2010031901852.html",
     "url": "http%3A%2F%2Fwww.washingtonpost.com%2Fwp-dyn%2Fcontent%2Farticle%2F2010%2F03%2F19%2FAR2010031901852.html",
     "title": "\u003cb\u003eObama\u003c/b\u003e heads to Hill on Sat. as health vote looms",
     "titleNoFormatting": "Obama heads to Hill on Sat. as health vote looms",
     "location": "",
     "publisher": "Washington Post",
     "publishedDate": "Fri, 19 Mar 2010 10:51:52 -0700",
     "signedRedirectUrl": "http://news.google.com/news/url?sa\u003dT\u0026ct\u003dus/0-2-1\u0026fd\u003dS\u0026url\u003dhttp://www.washingtonpost.com/wp-dyn/content/article/2010/03/19/AR2010031901852.html\u0026cid\u003d17593728737966\u0026ei\u003dE_ejS_CcBoqQrQOwv8qgAw\u0026usg\u003dAFQjCNGVp5KnNU-N72GmwgwiT8RQjx27mg",
     "language": "en"
    },
    {
     "unescapedUrl": "http://www.nasdaq.com/aspx/stock-market-news-story.aspx?storyid\u003d201003191447dowjonesdjonline000600\u0026title\u003dus-house-demssenreid-to-meet-obama-at-white-house-saturday",
     "url": "http%3A%2F%2Fwww.nasdaq.com%2Faspx%2Fstock-market-news-story.aspx%3Fstoryid%3D201003191447dowjonesdjonline000600%26title%3Dus-house-demssenreid-to-meet-obama-at-white-house-saturday",
     "title": "US House Dems, Sen. Reid To Meet \u003cb\u003eObama\u003c/b\u003e At White House Saturday",
     "titleNoFormatting": "US House Dems, Sen. Reid To Meet Obama At White House Saturday",
     "location": "",
     "publisher": "NASDAQ",
     "publishedDate": "Fri, 19 Mar 2010 11:53:27 -0700",
     "signedRedirectUrl": "http://news.google.com/news/url?sa\u003dT\u0026ct\u003dus/0-2-2\u0026fd\u003dS\u0026url\u003dhttp://www.nasdaq.com/aspx/stock-market-news-story.aspx%3Fstoryid%3D201003191447dowjonesdjonline000600%26title%3Dus-house-demssenreid-to-meet-obama-at-white-house-saturday\u0026cid\u003d17593728737966\u0026ei\u003dE_ejS_CcBoqQrQOwv8qgAw\u0026usg\u003dAFQjCNGyKQTON6YOQaJ6MWjzCAX440tZnA",
     "language": "en"
    },
    {
     "unescapedUrl": "http://www.rollcall.com/news/44384-1.html",
     "url": "http%3A%2F%2Fwww.rollcall.com%2Fnews%2F44384-1.html",
     "title": "House Democratic Caucus Heading to Meet With \u003cb\u003eObama\u003c/b\u003e on Saturday",
     "titleNoFormatting": "House Democratic Caucus Heading to Meet With Obama on Saturday",
     "location": "",
     "publisher": "Roll Call (subscription)",
     "publishedDate": "Fri, 19 Mar 2010 11:04:53 -0700",
     "signedRedirectUrl": "http://news.google.com/news/url?sa\u003dT\u0026ct\u003dus/0-2-3\u0026fd\u003dS\u0026url\u003dhttp://www.rollcall.com/news/44384-1.html\u0026cid\u003d17593728737966\u0026ei\u003dE_ejS_CcBoqQrQOwv8qgAw\u0026usg\u003dAFQjCNECC4f4fcdCaVRRnJTMzNsyOfPVbg",
     "language": "en"
    },
    {
     "unescapedUrl": "http://www.upi.com/Top_News/US/2010/03/19/Obama-to-host-Mexican-President-Calderon/UPI-95231269011896/",
     "url": "http%3A%2F%2Fwww.upi.com%2FTop_News%2FUS%2F2010%2F03%2F19%2FObama-to-host-Mexican-President-Calderon%2FUPI-95231269011896%2F",
     "title": "\u003cb\u003eObama\u003c/b\u003e to host Mexican President Calderon",
     "titleNoFormatting": "Obama to host Mexican President Calderon",
     "location": "",
     "publisher": "UPI.com",
     "publishedDate": "Fri, 19 Mar 2010 08:19:57 -0700",
     "signedRedirectUrl": "http://news.google.com/news/url?sa\u003dT\u0026ct\u003dus/0-2-4\u0026fd\u003dS\u0026url\u003dhttp://www.upi.com/Top_News/US/2010/03/19/Obama-to-host-Mexican-President-Calderon/UPI-95231269011896/\u0026cid\u003d17593728737966\u0026ei\u003dE_ejS_CcBoqQrQOwv8qgAw\u0026usg\u003dAFQjCNEtqkK5hzFfCodXc8PyLF2FskqhhQ",
     "language": "en"
    },
    {
     "unescapedUrl": "http://blogs.abcnews.com/politicalpunch/2010/03/the-presidential-planner-12.html",
     "url": "http%3A%2F%2Fblogs.abcnews.com%2Fpoliticalpunch%2F2010%2F03%2Fthe-presidential-planner-12.html",
     "title": "The Presidential Planner",
     "titleNoFormatting": "The Presidential Planner",
     "location": "",
     "publisher": "ABC News (blog)",
     "publishedDate": "Fri, 19 Mar 2010 04:00:13 -0700",
     "signedRedirectUrl": "http://news.google.com/news/url?sa\u003dT\u0026ct\u003dus/0-2-5\u0026fd\u003dS\u0026url\u003dhttp://blogs.abcnews.com/politicalpunch/2010/03/the-presidential-planner-12.html\u0026cid\u003d17593728737966\u0026ei\u003dE_ejS_CcBoqQrQOwv8qgAw\u0026usg\u003dAFQjCNGrnJLP8sJQW3KJoCmmqmP4CqxK8Q",
     "language": "en"
    },
    {
     "unescapedUrl": "http://blog.taragana.com/business/2010/03/19/obama-bringing-democratic-lawmakers-to-white-house-saturday-on-eve-of-close-health-care-vote-43308/",
     "url": "http%3A%2F%2Fblog.taragana.com%2Fbusiness%2F2010%2F03%2F19%2Fobama-bringing-democratic-lawmakers-to-white-house-saturday-on-eve-of-close-health-care-vote-43308%2F",
     "title": "\u003cb\u003eObama\u003c/b\u003e bringing Democratic lawmakers to White House Saturday on eve of close \u003cb\u003e...\u003c/b\u003e",
     "titleNoFormatting": "Obama bringing Democratic lawmakers to White House Saturday on eve of close ...",
     "location": "",
     "publisher": "Gaea Times (blog)",
     "publishedDate": "Fri, 19 Mar 2010 11:41:44 -0700",
     "signedRedirectUrl": "http://news.google.com/news/url?sa\u003dT\u0026ct\u003dus/0-2-6\u0026fd\u003dS\u0026url\u003dhttp://blog.taragana.com/business/2010/03/19/obama-bringing-democratic-lawmakers-to-white-house-saturday-on-eve-of-close-health-care-vote-43308/\u0026cid\u003d17593728737966\u0026ei\u003dE_ejS_CcBoqQrQOwv8qgAw\u0026usg\u003dAFQjCNEJvCsacSoyX8KNPAzM9ywzsW9G4Q",
     "language": "en"
    }
   ]
  },
  {
   "GsearchResultClass": "GnewsSearch",
   "clusterUrl": "http://news.google.com/news/story?ncl\u003dduRPvRQcoSFkZJM-iRbrb68ddhq7M\u0026hl\u003den\u0026ned\u003dus",
   "content": "In Indonesia, the presidential spokesman says, \u0026quot;The delay of President \u003cb\u003eObama\u0026#39;s\u003c/b\u003e visit to Indonesia is related to urgent internal matters, so we understand. \u003cb\u003e...\u003c/b\u003e",
   "unescapedUrl": "http://www.salon.com/news/politics/war_room/2010/03/19/noonan_obama",
   "url": "http%3A%2F%2Fwww.salon.com%2Fnews%2Fpolitics%2Fwar_room%2F2010%2F03%2F19%2Fnoonan_obama",
   "title": "Peggy Noonan isn\u0026#39;t inviting \u003cb\u003eBarack Obama\u003c/b\u003e to her birthday party",
   "titleNoFormatting": "Peggy Noonan isn\u0026#39;t inviting Barack Obama to her birthday party",
   "location": "",
   "publisher": "Salon",
   "publishedDate": "Fri, 19 Mar 2010 12:31:21 -0700",
   "signedRedirectUrl": "http://news.google.com/news/url?sa\u003dT\u0026ct\u003dus/0-3-0\u0026fd\u003dS\u0026url\u003dhttp://www.salon.com/news/politics/war_room/2010/03/19/noonan_obama\u0026cid\u003d17593726360755\u0026ei\u003dE_ejS_CcBoqQrQOwv8qgAw\u0026usg\u003dAFQjCNHVnR8zXqJDvEZupJD8v6pthiK3qQ",
   "language": "en",
   "image": {
    "url": "http://media.kansascity.com/smedia/2010/03/16/09/549-Obamas_Indonesia.sff.embedded.prod_affiliate.81.jpg",
    "tbUrl": "http://nt3.ggpht.com/news/tbn/g8RaEpHXxWUJ",
    "originalContextUrl": "http://www.kansascity.com/2010/03/15/1814641/obamas-asia-trip-more-about-influence.html",
    "publisher": "Kansas City Star",
    "tbWidth": 57,
    "tbHeight": 80
   },
   "relatedStories": [
    {
     "unescapedUrl": "http://www.csmonitor.com/World/Asia-Pacific/2010/0319/Indonesia-disappointed-after-Barack-Obama-delays-trip",
     "url": "http%3A%2F%2Fwww.csmonitor.com%2FWorld%2FAsia-Pacific%2F2010%2F0319%2FIndonesia-disappointed-after-Barack-Obama-delays-trip",
     "title": "Indonesia disappointed after \u003cb\u003eBarack Obama\u003c/b\u003e delays trip",
     "titleNoFormatting": "Indonesia disappointed after Barack Obama delays trip",
     "location": "",
     "publisher": "Christian Science Monitor",
     "publishedDate": "Fri, 19 Mar 2010 08:54:46 -0700",
     "signedRedirectUrl": "http://news.google.com/news/url?sa\u003dT\u0026ct\u003dus/0-3-1\u0026fd\u003dS\u0026url\u003dhttp://www.csmonitor.com/World/Asia-Pacific/2010/0319/Indonesia-disappointed-after-Barack-Obama-delays-trip\u0026cid\u003d17593726360755\u0026ei\u003dE_ejS_CcBoqQrQOwv8qgAw\u0026usg\u003dAFQjCNHTo1eRxUOVRiupTXTLP6OIQqT1WQ",
     "language": "en"
    },
    {
     "unescapedUrl": "http://www.reuters.com/article/idUSTRE62H3PL20100319",
     "url": "http%3A%2F%2Fwww.reuters.com%2Farticle%2FidUSTRE62H3PL20100319",
     "title": "Indonesia says understands \u003cb\u003eObama\u003c/b\u003e trip delay",
     "titleNoFormatting": "Indonesia says understands Obama trip delay",
     "location": "",
     "publisher": "Reuters",
     "publishedDate": "Fri, 19 Mar 2010 01:16:29 -0700",
     "signedRedirectUrl": "http://news.google.com/news/url?sa\u003dT\u0026ct\u003dus/0-3-2\u0026fd\u003dS\u0026url\u003dhttp://www.reuters.com/article/idUSTRE62H3PL20100319\u0026cid\u003d17593726360755\u0026ei\u003dE_ejS_CcBoqQrQOwv8qgAw\u0026usg\u003dAFQjCNGCAjJesHBIKwA5OQBdTZXHxFvquw",
     "language": "en"
    },
    {
     "unescapedUrl": "http://www.latimes.com/news/nationworld/politics/wire/sns-ap-us-obama-indonesia,0,23439.story",
     "url": "http%3A%2F%2Fwww.latimes.com%2Fnews%2Fnationworld%2Fpolitics%2Fwire%2Fsns-ap-us-obama-indonesia%2C0%2C23439.story",
     "title": "His trip put off by health care debate, \u003cb\u003eObama\u003c/b\u003e assures Indonesians he will \u003cb\u003e...\u003c/b\u003e",
     "titleNoFormatting": "His trip put off by health care debate, Obama assures Indonesians he will ...",
     "location": "",
     "publisher": "Los Angeles Times",
     "publishedDate": "Thu, 18 Mar 2010 22:06:24 -0700",
     "signedRedirectUrl": "http://news.google.com/news/url?sa\u003dT\u0026ct\u003dus/0-3-3\u0026fd\u003dS\u0026url\u003dhttp://www.latimes.com/news/nationworld/politics/wire/sns-ap-us-obama-indonesia,0,23439.story\u0026cid\u003d17593726360755\u0026ei\u003dE_ejS_CcBoqQrQOwv8qgAw\u0026usg\u003dAFQjCNGlRYDZNbmOrBhJmpb02piX-sbSNw",
     "language": "en"
    },
    {
     "unescapedUrl": "http://www.straitstimes.com/BreakingNews/SEAsia/Story/STIStory_504385.html",
     "url": "http%3A%2F%2Fwww.straitstimes.com%2FBreakingNews%2FSEAsia%2FStory%2FSTIStory_504385.html",
     "title": "\u003cb\u003eObama\u003c/b\u003e risks losing chance to build ties",
     "titleNoFormatting": "Obama risks losing chance to build ties",
     "location": "",
     "publisher": "Straits Times",
     "publishedDate": "Fri, 19 Mar 2010 14:50:04 -0700",
     "signedRedirectUrl": "http://news.google.com/news/url?sa\u003dT\u0026ct\u003dus/0-3-4\u0026fd\u003dS\u0026url\u003dhttp://www.straitstimes.com/BreakingNews/SEAsia/Story/STIStory_504385.html\u0026cid\u003d17593726360755\u0026ei\u003dE_ejS_CcBoqQrQOwv8qgAw\u0026usg\u003dAFQjCNFq5F12HCwwg_BFs0eNqFaZWMH7Pw",
     "language": "en"
    },
    {
     "unescapedUrl": "http://www1.voanews.com/english/news/asia/Indonesians-React-to-Postponement-of-US-Presidents-Trip-With-Disappointment-Support-88541577.html",
     "url": "http%3A%2F%2Fwww1.voanews.com%2Fenglish%2Fnews%2Fasia%2FIndonesians-React-to-Postponement-of-US-Presidents-Trip-With-Disappointment-Support-88541577.html",
     "title": "Indonesians React to Postponement of \u003cb\u003eObama\u0026#39;s\u003c/b\u003e Trip With Disappointment, Support",
     "titleNoFormatting": "Indonesians React to Postponement of Obama\u0026#39;s Trip With Disappointment, Support",
     "location": "",
     "publisher": "Voice of America",
     "publishedDate": "Fri, 19 Mar 2010 04:59:17 -0700",
     "signedRedirectUrl": "http://news.google.com/news/url?sa\u003dT\u0026ct\u003dus/0-3-5\u0026fd\u003dS\u0026url\u003dhttp://www1.voanews.com/english/news/asia/Indonesians-React-to-Postponement-of-US-Presidents-Trip-With-Disappointment-Support-88541577.html\u0026cid\u003d17593726360755\u0026ei\u003dE_ejS_CcBoqQrQOwv8qgAw\u0026usg\u003dAFQjCNG4YczK9pc_LhHtL0yTRDWzikWZEw",
     "language": "en"
    },
    {
     "unescapedUrl": "http://english.ntdtv.com/ntdtv_en/ns_asia/2010-03-19/761757247967.html",
     "url": "http%3A%2F%2Fenglish.ntdtv.com%2Fntdtv_en%2Fns_asia%2F2010-03-19%2F761757247967.html",
     "title": "\u003cb\u003eObama\u003c/b\u003e Delays Trip to Indonesia",
     "titleNoFormatting": "Obama Delays Trip to Indonesia",
     "location": "",
     "publisher": "NTDTV",
     "publishedDate": "Fri, 19 Mar 2010 10:23:14 -0700",
     "signedRedirectUrl": "http://news.google.com/news/url?sa\u003dT\u0026ct\u003dus/0-3-6\u0026fd\u003dS\u0026url\u003dhttp://english.ntdtv.com/ntdtv_en/ns_asia/2010-03-19/761757247967.html\u0026cid\u003d17593726360755\u0026ei\u003dE_ejS_CcBoqQrQOwv8qgAw\u0026usg\u003dAFQjCNHDyzocNKHbLDg4WamlTfdYcUh2Dg",
     "language": "en"
    }
   ]
  }
 ],
 "cursor": {
  "pages": [
   {
    "start": "0",
    "label": 1
   },
   {
    "start": "4",
    "label": 2
   },
   {
    "start": "8",
    "label": 3
   },
   {
    "start": "12",
    "label": 4
   },
   {
    "start": "16",
    "label": 5
   },
   {
    "start": "20",
    "label": 6
   },
   {
    "start": "24",
    "label": 7
   },
   {
    "start": "28",
    "label": 8
   }
  ],
  "estimatedResultCount": "176523",
  "currentPageIndex": 0,
  "moreResultsUrl": "http://news.google.com/nwshp?oe\u003dutf8\u0026ie\u003dutf8\u0026source\u003duds\u0026q\u003dBarack+Obama\u0026hl\u003den\u0026start\u003d0"
 }
}
, "responseDetails": null, "responseStatus": 200}


    var eachNews={};
    var newsItems = [];
    
    var myResults = answer["responseData"]["results"];
    //log(myResults);
    if (myResults.length>0) {
      for (var i in myResults) {
            
            eachNews={clusterUrl:myResults[i]["clusterUrl"],
                      content:myResults[i]["content"],
                      html:myResults[i]["html"],
                      publisher:myResults[i]["publisher"],
                      //image:myResults[i]["image"]!=undefined ? myResults[i]["image"]:null,
                      image: 'https://media.pitchfork.com/photos/5b65e18413033372016214dc/2:1/w_790/Donald%20Glover.png',
                      relatedStories:myResults[i]["relatedStories"],
                      title:myResults[i]["title"],
                      unescapedTitle: String((myResults[i]["titleNoFormatting"])).replace(/&#39;/g, "'"),
                      
                      url:myResults[i]["url"],
                      unescapedUrl:myResults[i]["unescapedUrl"],
                      }
                      //log(eachNews["unescapedTitle"]);
                      //log(eachNews["title"]);
            newsItems.push(eachNews);
        }
          
    
    
    allNews.push({news:newsItems, topic:topic}); 
    
   }
   else
   {
     allNews.push({news:"notF", topic:"notF"});
   }
  Logger.log(allNews); 
  return allNews;

*/
