var items = [
	{ 
		name: "Facebook", 
		slink: "http://www.facebook.com/share.php?u=%link%",
		ico: "http://fbreader.googlecode.com/files/facebook_icon.png"
	},
	{
		name: "Delicious", 
		slink: "http://delicious.com/post?url=%link%&title=%title%",
		ico: "http://fbreader.googlecode.com/files/delicious_icon.png"
	},
	{
		name: "Meneame", 
		slink: "http://meneame.net/submit.php?url=%link%",
		ico: "http://fbreader.googlecode.com/files/meneame.png"
	}
	];


var fbreader={version:"0.3", //modificada - Marcio Barrios
    addScripts:function(){
        if(typeof jQuery=='function')
            return;
        var s=document.createElement("script");
		s.src='http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js?rand='+Math.random();
        s.type='text/javascript';
        s.setAttribute("id","script_fbreader");
        s.onload=s.onreadystatechange=this.cargando;
        document.getElementsByTagName("head")[0].appendChild(s);
    },
    cargando:function(){
        if(typeof jQuery!='function') return;
        jQuery.noConflict();
		
		jQuery(".entry").live('mouseover',fbreader.addnewitems);
		
		jQuery('#message-area-inner').html('GReader Share cargado correctamente')
		jQuery('#message-area-outer').addClass('info-message').removeClass('hidden');
		setTimeout("jQuery('#message-area-outer').addClass('hidden')",3000);
	}, 
    addnewitems:function(){
		var b = jQuery(this);
		var c = jQuery(".entry-actions",b);
		
		if (b.find('.entry-share-action').length!=0) return;
		else{
			var u=jQuery("a.entry-title-link",b).attr("href");
            var t=jQuery("a.entry-title-link",b).text();
			
            for (var x in items) {
            	var name = items[x].name;
        	    var slink = items[x].slink;
				slink = slink.replace("%link%", escape(u)).replace("%title%", escape(t));
            	var ico = items[x].ico;
        	
                jQuery(c).append('<span id="'+name+'" class="entry-share-action broadcast link unselectable" style="background:url('+ico+') no-repeat; padding-left:14px" rel="' + slink +  '">'+name+'</span>');
            }
        
            jQuery(".entry-share-action").unbind('click').bind("click",function(){
                window.open(jQuery(this).attr('rel'), '_blank');
				return false;
            });
        }
    },
    init:function(){
        if(typeof jQuery!='function')
            this.addScripts();
        else this.cargando()
    }
};
fbreader.init();



