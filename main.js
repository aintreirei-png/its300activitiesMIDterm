 jQuery(document).ready(function(){
     
   "use strict"
    if (typeof $.fn.ripples === 'function') {
      $('.slider').ripples({
        dropRadius: 11,
        perturbance: 0.01,
      });
    }

    var phrases = [
      { text: "Nanghinaot sa langitnon nga gahom", highlight: "langitnon nga gahom" },
      { text: "Kay sa kanunay ko nimo nag dahom", highlight: "nimo nag dahom" }
    ];
    var $line = $(".typing-line");
    var phraseIndex = 0;
    var charIndex = 0;
    var deleting = false;

    function renderPhrase() {
      var currentPhrase = phrases[phraseIndex];
      var typedLength = deleting ? charIndex - 1 : charIndex;
      var typedText = currentPhrase.text.slice(0, Math.max(0, typedLength));
      var highlightStart = currentPhrase.text.indexOf(currentPhrase.highlight);

      if (highlightStart === -1) {
        $line.html(typedText);
        return;
      }

      var beforeHighlight = typedText.slice(0, highlightStart);
      var highlightedText = typedText.slice(highlightStart);
      $line.html(beforeHighlight + (highlightedText ? "<span class='highlight'>" + highlightedText + "</span>" : ""));
    }

    function typeText() {
      var currentPhrase = phrases[phraseIndex];

      if (!deleting) {
        charIndex++;
        if (charIndex > currentPhrase.text.length) {
          charIndex = currentPhrase.text.length;
        }
      } else {
        charIndex--;
        if (charIndex < 0) {
          charIndex = 0;
        }
      }

      renderPhrase();

      if (!deleting) {
        if (charIndex === currentPhrase.text.length) {
          deleting = true;
          setTimeout(typeText, 1700);
          return;
        }
      } else {
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }

      setTimeout(typeText, deleting ? 60 : 100);
    }

    typeText();

    $(window).scroll(function(){
        
       var top = $(window).scrollTop();
        if(top>=60){
          $("nav").addClass('secondary'); 
        }
        
        else 
            if($("nav").hasClass('secondary')){
                $("nav").removeClass('secondary'); 
            }
    });

        var $galleryLinks = $('.work .img-wrapper a');
        var $lightbox = $('.image-lightbox');
        var $lightboxImage = $('.lightbox-image');
        var $lightboxCaption = $('.lightbox-caption');
        var currentImageIndex = 0;

        function showImage(index) {
          currentImageIndex = (index + $galleryLinks.length) % $galleryLinks.length;
          var $link = $galleryLinks.eq(currentImageIndex);
          $lightboxImage.attr({
            src: $link.attr('href'),
            alt: $link.find('img').attr('alt') || 'Gallery image'
          });
          $lightboxCaption.text($link.attr('title') || (currentImageIndex + 1) + ' of ' + $galleryLinks.length);
        }

        $galleryLinks.on('click', function(event) {
          event.preventDefault();
          showImage($galleryLinks.index(this));
          $lightbox.addClass('is-open').attr('aria-hidden', 'false');
          $('body').addClass('lightbox-open');
        });

        $('.lightbox-prev').on('click', function() { showImage(currentImageIndex - 1); });
        $('.lightbox-next').on('click', function() { showImage(currentImageIndex + 1); });
        $('.lightbox-close, .image-lightbox').on('click', function(event) {
          if (event.target === this) {
            $lightbox.removeClass('is-open').attr('aria-hidden', 'true');
            $('body').removeClass('lightbox-open');
          }
        });

        $(document).on('keydown', function(event) {
          if (!$lightbox.hasClass('is-open')) return;
          if (event.key === 'Escape') $('.lightbox-close').trigger('click');
          if (event.key === 'ArrowLeft') showImage(currentImageIndex - 1);
          if (event.key === 'ArrowRight') showImage(currentImageIndex + 1);
        });

          var $videoLightbox = $('.video-lightbox');
          var video = $('.rick-roll-video')[0];

          $('.youtube-link').on('click', function(event) {
            event.preventDefault();
            $videoLightbox.addClass('is-open').attr('aria-hidden', 'false');
            $('body').addClass('lightbox-open');
            video.currentTime = 0;
            video.play().catch(function() {});
          });

          $('.video-lightbox-close, .video-lightbox').on('click', function(event) {
            if (event.target === this) {
              video.pause();
              $videoLightbox.removeClass('is-open').attr('aria-hidden', 'true');
              $('body').removeClass('lightbox-open');
            }
          });

          $(document).on('keydown', function(event) {
            if (event.key === 'Escape' && $videoLightbox.hasClass('is-open')) {
              $('.video-lightbox-close').trigger('click');
            }
          });
     
      if (typeof $.fn.owlCarousel === 'function') {
        $("#team-members").owlCarousel({
          items:3,
          autoplay:true,
          smartSpeed:700,
          loop:true,
          autoplayHoverPause:true,
            responsive:{
              0:{
          
                 items:1
              }, 
             480:{
          
                 items:2
              }, 
                                     
             768:{
          
                 items:3
              } 
            }
          
          
          
        });
      }
     $('.counter').counterUp({
                delay: 10,
                time: 4000
            });
     
      $("a.smooth-scroll").click(function (event) {

        event.preventDefault();
        
        var section = $(this).attr("href");

        $('html, body').animate({
            scrollTop: $(section).offset().top - -2
        }, 1250, "easeInOutExpo");
    });

    // CTA Contact: scroll to form, prefill subject and focus the name field
    $('#cta-contact').on('click', function(e){
        e.preventDefault();
        var href = $(this).attr('href');
        var section = $(href);
        var subj = $(this).data('subject') || '';
        $('html, body').animate({
            scrollTop: section.offset().top - -2
        }, 1250, "easeInOutExpo", function(){
            if(subj) $('#subject').val(subj);
            $('#name').focus();
        });
    });
     new WOW().init();
     
 // Contact form: client-side validation and AJAX submission (works for inline form and modal form)
 $('.contact-form').on('submit', function(e){
     e.preventDefault();
     var $form = $(this);
     var $alert = $form.find('.form-alert');
     var name = $.trim($form.find('[name="name"]').val());
     var email = $.trim($form.find('[name="email"]').val());
     var subject = $.trim($form.find('[name="subject"]').val());
     var message = $.trim($form.find('[name="message"]').val());
     var source = $form.find('[name="source"]').val() || 'inline';

     function showAlert(type, msg){
         if($alert.length === 0){
             // fallback to top page alert
             $alert = $('#form-alert');
         }
         $alert.removeClass('success error').addClass(type).text(msg).show();
         try{ $('html,body').animate({scrollTop: $alert.offset().top - 100}, 300);}catch(e){}
     }

     if(!name){ showAlert('error','Please enter your name.'); return; }
     var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if(!email || !emailPattern.test(email)){ showAlert('error','Please enter a valid email address.'); return; }
     if(subject.length < 3){ showAlert('error','Please enter a subject.'); return; }
     if(message.length < 10){ showAlert('error','Please enter a message (at least 10 characters).'); return; }

     var $btn = $form.find('button[type=submit]');
     var originalBtnText = $btn.text();
     $btn.prop('disabled', true).text('Sending...');

     var postData = {name:name, email:email, subject:subject, message:message, source:source};
     var recaptchaSiteKey = $('body').data('recaptcha-sitekey') || '';
     var recaptchaEnabled = recaptchaSiteKey && recaptchaSiteKey !== 'YOUR_RECAPTCHA_SITE_KEY' && typeof grecaptcha !== 'undefined';

     function doAjaxWithData(data){
         $.ajax({
             url: $form.attr('action'),
             method: 'POST',
             data: data,
             dataType: 'json',
             timeout: 15000
         }).done(function(resp){
             if(resp && resp.success){
                 showAlert('success', resp.message || 'Message sent successfully.');
                 $form[0].reset();
                 // sent animation
                 $btn.addClass('sent').text('Sent');
                 setTimeout(function(){
                     $btn.removeClass('sent').text(originalBtnText);
                 }, 1700);
                 if($form.is('#modal-contactform')){
                     setTimeout(closeModal, 1200);
                 }
             } else {
                 showAlert('error', resp.message || 'An error occurred while sending your message.');
             }
         }).fail(function(){
             showAlert('error','An error occurred while sending your message. Please try again later.');
         }).always(function(){
             $btn.prop('disabled', false).text(originalBtnText);
         });
     }

     if(recaptchaEnabled){
         if(typeof grecaptcha === 'undefined'){
             showAlert('error','reCAPTCHA is not available. Please check your configuration.');
             $btn.prop('disabled', false).text(originalBtnText);
             return;
         }
         // execute v3 action
         grecaptcha.execute(recaptchaSiteKey, {action: 'contact'}).then(function(token){
             postData['g-recaptcha-response'] = token;
             doAjaxWithData(postData);
         }).catch(function(){
             showAlert('error','reCAPTCHA execution failed.');
             $btn.prop('disabled', false).text(originalBtnText);
         });
     } else {
         doAjaxWithData(postData);
     }
 });

 // Quick Contact modal open/close
 function openModal(subject){
     var $modal = $('#quick-contact-modal');
     if(subject) $modal.find('[name="subject"]').val(subject);
     $modal.show().attr('aria-hidden','false');
     $('body').addClass('modal-open');
     $modal.find('[name="name"]').focus();
 }
 function closeModal(){
     var $modal = $('#quick-contact-modal');
     $modal.hide().attr('aria-hidden','true');
     $('body').removeClass('modal-open');
     $modal.find('.form-alert').hide().text('');
 }

 $('#cta-quick').on('click', function(e){
     e.preventDefault();
     var subj = $(this).data('subject') || '';
     openModal(subj);
 });

 $('#quick-contact-modal .modal-close, #quick-contact-modal .modal-overlay').on('click', function(){
     closeModal();
 });

 $(document).on('keydown', function(e){ if(e.key === 'Escape'){ closeModal(); } });
 });