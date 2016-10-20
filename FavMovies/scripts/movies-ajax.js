$("document").ready(function(){
    
    //XML object
    var moviesXMLObject = null;
    
    //HTML objects
    var $titleSearchTxt;
    var $showSearchByTitleBtn, $showAllBtn;
    var $mainContent;
    
    var init = function(){
        
        var setHTMLObjects = function(){console.log("funker");
            $titleSearchTxt = $("#titleSearchTxt");
            $showSearchByTitleBtn = $("#showSearchByTitleBtn");
            $showAllBtn = $("#showAllBtn");
            $mainContent = $("#mainContent");
            
        }();//end setHTMLObjects
        
        var setEvents = function(){
            $showAllBtn.on("click", showAll);
            $showSearchByTitleBtn.on("click", $showSearchByTitle);
        }();//end setEvents
        
        var initPage = function(){
            getMoviesXML();
        }();//end initPage
        
    }();//end init
    
    function $showSearchByTitle(){
        $mainContent.html(""); //denne gjør så det ikke dupliserer søk.
        
        $(moviesXMLObject)
            .find("movie")
            .each(function(){
                var title = $("title", this).text();
            
                var searchTerm = $titleSearchTxt.val();
            
                var fantMatch = title.toLowerCase().indexOf(searchTerm.toLowerCase());
            
                if(fantMatch !== -1){
                    
            
                var imageSrc = $("imageSrc", this).text();
            
                var $newTitle = $("<h3>").html(title);
                var $newImage = $("<img>")
                    .attr(
                        {
                            src: "images/" + imageSrc,
                            alt: title
                        }
                    )
                    .addClass("img-responsive");
            
                var $newArticle = $("<article>")
                    .addClass("col-md-3")
                    .append($newTitle, $newImage);
            
                $mainContent.append($newArticle);
            }//tilhører if løkka
        });
    };
    
    function showAll(){
        $(moviesXMLObject)
            .find("movie")
            .each(function(){
                var title = $("title", this).text();
                var imageSrc = $("imageSrc", this).text();
            
                var $newTitle = $("<h3>").html(title);
                var $newImage = $("<img>")
                    .attr(
                        {
                            src: "images/" + imageSrc,
                            alt: title
                        }
                    )
                    .addClass("img-responsive");
            
                var $newArticle = $("<article>")
                    .addClass("col-md-3")
                    .append($newTitle, $newImage);
            
                $mainContent.append($newArticle);
        });
    };
    
    function getMoviesXML(){
        
        $.ajax(
            {
                method: "GET",
                url: "xml/movies.xml",
                dataType: "xml",
                async: true,
                
                beforeSend: function(){
                    console.log("skal sende snart");
                    $mainContent
                        .append("<div class='col-md-12'><p class='alert alert-warning'>XML-filen laster..</p></div>")
                },
                success: function(xmlResult){
                    moviesXMLObject = xmlResult;
                    $(".alert")
                        .html("XML er på plass :)")
                        .delay(1000).fadeOut(3000); //vil ikke legge til delay her vanligvis, bare for å vise
                },
                error: function(xhr, statusText, errorMsg){
                    console.log(xhr + " " + statusText + " " + errorMsg);
                },
                complete: function(){
                    console.log("complete");
                }
            }
        );//end ajax call
        
    }
    
});