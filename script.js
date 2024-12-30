let datos = {};
document.addEventListener('DOMContentLoaded', function() {
    
});


document.addEventListener('DOMContentLoaded', function() {

    // Buscar el modo seleccionado en storage
    const tema = localStorage.getItem('tema');
    if (tema) document.body.classList.toggle('modo-claro', tema === 'modo-claro');

    document.getElementById('toggle-tema').addEventListener('change', function() {
        const isWhiteMode = document.body.classList.toggle('modo-claro');
        localStorage.setItem('tema', isWhiteMode ? 'modo-claro' : 'modo-oscuro');
    });



    const navList    = document.getElementsByTagName('ul')[0];
    const btnUp      = document.getElementById('btnBack');
    const btnDown    = document.getElementById('btnDown');
    const targetDown = document.getElementById('experiencia');
    const social     = document.getElementsByTagName('button');

    navList.addEventListener('click', function(event) {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            const targetId      = event.target.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });

    social[0].addEventListener('click', function(event) {
        event.preventDefault();
        window.open('https://github.com/RomanKoc', '_blank');
    });
    social[1].addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'mailto:romankocdev@gmail.com';
    });
    social[2].addEventListener('click', function(event) {
        event.preventDefault();
        window.open('https://www.linkedin.com/in/roman-koc-dev/', '_blank');
    });

    btnDown.addEventListener('click', function() {
        targetDown.scrollIntoView({ behavior: 'smooth' });
    });
    btnUp.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const secciones = document.querySelectorAll('section');
    const navLinks  = document.querySelectorAll('#nav-list a');

    function changeActiveLink() {
        let index    = secciones.length;
        const offset = window.innerHeight * 0.1; // 10vh

        while (--index && window.scrollY + offset < secciones[index].offsetTop) {}

        navLinks.forEach((link) => link.classList.remove('active'));
        if (index >= 0 && index < navLinks.length) {
            navLinks[index].classList.add('active');
        }

        // Asegurar de que la última sección se active correctamente
        const bottomOfWindow = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight;
        if (bottomOfWindow) {
            navLinks.forEach((link) => link.classList.remove('active'));
            navLinks[navLinks.length - 1].classList.add('active');
        }
    }

    changeActiveLink();
    window.addEventListener('scroll', changeActiveLink);
});
function rellenarContenido(data) {
    // Rellenar datos personales
    document.querySelector('#titulo h1').textContent = data.datosPersonales.titulo;
    document.querySelector('#titulo p').innerHTML = data.datosPersonales.descripcion;
    console.log(document.querySelector('#titulo p'))
    // Rellenar redes sociales
    const socialButtons = document.querySelectorAll('.social .Btn');
    socialButtons.forEach((button, index) => {
        if (data.social[index]) {
            button.addEventListener('click', () => {
                if (data.social[index].url.startsWith('mailto:')) {
                    window.location.href = data.social[index].url;
                } else {
                    window.open(data.social[index].url, '_blank');
                }
            });
        }
    });

    // Rellenar experiencia laboral
    const experienciaCards = document.querySelectorAll('#experiencia .card');
    experienciaCards.forEach((card, index) => {
        if (data.trabajo[index]) {
            const job = data.trabajo[index];
            card.querySelector('h2').textContent = job.puesto;
            card.querySelector('h3').textContent = `${job.comienzo} - ${job.fin}`;
            card.querySelector('p').innerHTML = job.descripcion;
        }
    });

    // Rellenar educación
    const educacionCards = document.querySelectorAll('#educacion .card.education');
    educacionCards.forEach((card, index) => {
        if (data.educacion[index]) {
            const edu = data.educacion[index];
            card.querySelector('h2').textContent = edu.curso;
            if (edu.descripcion) {
                card.querySelector('p').textContent = edu.descripcion;
            } else {
                const skillsDiv = card.querySelector('.skills');
                edu.skills.forEach((skillSet, skillIndex) => {
                    const skillDiv = skillsDiv.children[skillIndex];
                    skillSet.forEach((skill, skillItemIndex) => {
                        skillDiv.children[skillItemIndex].textContent = skill;
                    });
                });
            }
        }
    });
}