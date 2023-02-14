// Navbar - Sticky
document.addEventListener("DOMContentLoaded", function() {
  window.addEventListener("scroll", function() {
    if (window.scrollY > 20) {
      document.querySelector(".navbar").classList.add("sticky");
    } else {
      document.querySelector(".navbar").classList.remove("sticky");
    }
  });
});

// menu-btn script
document.querySelector(".menu-btn").addEventListener("click", function() {
  document.querySelector(".navbar .menu").classList.toggle("active");
});


// Send-Email Button

const contactForm = document.getElementById('contactform')

// function send email click
function sendMsg(e) {
    e.preventDefault();

    const name = document.getElementById('name'),
        email = document.getElementById('email'),
        subject = document.getElementById('subject'),
        msg = document.getElementById('message');

    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "ozgevuralkoca@gmail.com",
        Password: "46606A2AD96685A53B1A17649031E655086E",
        To: 'ozgevuralkoca@gmail.com',
        From: email.value,
        Subject: subject.value,
        Body: msg.value
    }).then(
        message => alert(message)
    )
};

// add the eventListener submit
contactform.addEventListener('submit', sendMsg);









