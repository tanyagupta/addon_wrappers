function github_api_adapter (text){

  var url = 'https://api.github.com/search/repositories?q='+text+'&sort=stars&order=desc';
  var articles= JSON.parse(UrlFetchApp.fetch(url))['items']
  Logger.log(articles)
  
  var adapted_gh_obj=[]
  

  for (var i in articles){
    var temp={};
    temp['title']= articles[i]['name'] || "No title";
    temp['source'] = articles[i]['html_url'] || 'No source';
    temp['see_also'] = articles[i]['owner']['repos_url'] || 'No related';
    temp['image'] = articles[i]['owner']['avatar_url'] || 'http://www.rockvalleytruck.com/image/cache/placeholder-200x200.png';
    temp['parent'] = articles[i]['full_name'] || "No name"
    temp['content'] = articles[i]['description'] || "No description"
    
    adapted_gh_obj.push(temp)
  }
  
  var result =[GLOBAL.main_term,adapted_gh_obj];
  
  Logger.log(result)
  return result

}

function contextual_search_adapter(text){

  var url = "https://contextualwebsearch-websearch-v1.p.mashape.com/api/Search/NewsSearchAPI?count=50&q="+text+"&autocorrect=true"
  var response = UrlFetchApp.fetch(url, {
      headers: {
        "X-Mashape-Key" : "X1WzPpdL8rmshJi3L0bf5LHHTZSYp113KLljsnJZg6RP4co3XU",
     "X-Mashape-Host": "contextualwebsearch-websearch-v1.p.mashape.com",
     "Content-Type" : "application/json; charset=utf-8",
      }
    });
  
  var url = 'https://newsapi.org/v2/everything?q='+text+'&sortBy=publishedAt&apiKey=cb631de235df4efd8362ae5b268f0f78';
  var result= JSON.parse(UrlFetchApp.fetch(url))
  
  
  var articles=result['articles']
  var news_obj
  if (articles.length>0){
    var adapted_news_obj=[]  
    Logger.log(articles[0])
    for (var i in articles){
      var temp={};
      temp['title']= articles[i]['title'] || "No title";
      temp['source'] = articles[i]['url'] || 'No source';
      temp['see_also'] = articles[i]['url'] || 'No related';
      temp['image'] = articles[i]['urlToImage'] || 'http://www.rockvalleytruck.com/image/cache/placeholder-200x200.png';
      temp['parent'] = articles[i]['author']  || "No name"
      temp['content'] = articles[i]['description'] || "No description"
      
      adapted_news_obj.push(temp)
    }
  
   news_obj =[GLOBAL.main_term,adapted_news_obj];
  }
  else{
   news_obj =  [GLOBAL.main_term,articles]
  }

  return news_obj
}
 
/*

{datePublished=2018-08-05T12:53:44, image={base64Encoding=null, width=470, url=https://www.mediaite.com/wp-content/uploads/2018/07/GettyImages-989911500-1-470x470.jpg, height=470}, keywords=president donald trump,mediaite, provider={name=mediaite}, description=President <b>Donald Trump</b> rejected a report that he's worried his adult son, <b>Donald Trump</b> Jr., may have accidentally broken the law during the 2016 election. The, language=en, title=<b>Trump</b> Says Report He’s Worried Don Jr. Broke Law With ‘Totally Legal’ <b>Trump</b> Tower Meeting is ‘Fake News’, url=https://www.mediaite.com/online/trump-says-report-hes-worried-don-jr-broke-law-with-totally-legal-trump-tower-meeting-is-fake-news/, isSafe=false}

*/ 
  
  
  
  
  

function news_api_adapter (text){
  
  var url = 'https://newsapi.org/v2/everything?q='+text+'&sortBy=publishedAt&apiKey=cb631de235df4efd8362ae5b268f0f78';
  var result= JSON.parse(UrlFetchApp.fetch(url))
  var articles=result['articles']
  var news_obj
  if (articles.length>0){
    var adapted_news_obj=[]  
    
    for (var i in articles){
      var temp={};
      temp['title']= articles[i]['title'] || "No title";
      temp['source'] = articles[i]['url'] || 'No source';
      temp['see_also'] = articles[i]['url'] || 'No related';
      temp['image'] = articles[i]['urlToImage'] || 'http://www.rockvalleytruck.com/image/cache/placeholder-200x200.png';
      temp['parent'] = articles[i]['source']['name'] || "No name"
      temp['content'] = articles[i]['description'] || "No description"
      
      adapted_news_obj.push(temp)
    }
  
   news_obj =[GLOBAL.main_term,adapted_news_obj];
  }
  else{
   news_obj =  [GLOBAL.main_term,articles]
  }

  return news_obj

}
 
/* assume all news is the array of the new data structure Title: A short string See Also: URL Parent: String Image: URL Source: URL Content: Big String */
