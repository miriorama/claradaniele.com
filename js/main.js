class Clara {
    static prevWidth = null;
    static projects = [
        {id: 'una-cosa-bianca', img: 'img/una-cosa-bianca/una-cosa-bianca-1.jpg', height: 250, year: '2024-2025',title: 'Una cosa bianca'},
        {id: 'intima-materia', video: 'img/intima-materia/intima-materia.mp4', height: 250, year: '2023',title: 'Intima Materia'},
        {id: 'la-forme-fermee', img: 'img/la-forme-fermee/la-forme-fermee-1.jpg', height: 310, year: '2021',title: 'La forme fermèe'},
        {id: 'sedimenti', img: 'img/sedimenti/sedimenti-1.jpg', height: 400, year: '2021',title: 'Sedimenti'},
        {id: 'faccia', video: 'img/faccia/faccia-3.mp4', height: 180, year: '2019',title: 'Io sono l\'altra faccia di te'},
        {id: '300-grammi', video: 'img/300-grammi/300-grammi.mp4', height: 400, year: '2019',title: '300 grammi'},
        {id: 'ex-voto', img: 'img/ex-voto/ex-voto-1.jpg', height: 350, year: '2019',title: 'Ex Voto'},
        {id: 'legami', img: 'img/legami/legami-1.jpg', height: 250, year: '2018',title: 'Legami'},
        {id: 'lettera-occhi', img: 'img/lettera-occhi/lettera-occhi-1.jpg', height: 310, year: '2018',title: 'Lettera dai Tuoi Occhi'},
        {id: 'attraverso', img: 'img/attraverso/attraverso-1.jpg', height: 400, year: '2018',title: 'Attraverso'},
        {id: 'vanitas', img: 'img/vanitas/vanitas-1.jpg', height: 180, year: '2018',title: 'Vanitas Vanitatum et Omnia Vanitas'},
        {id: 'no-violence', img: 'img/no-violence/no-violence-1.jpg', height: 400, year: '2018',title: 'Image no violence on woman'},
        {id: 'ricorda', img: 'img/ricorda/ricorda-1.jpg', height: 350, year: '2017',title: 'Ricorda di essere stato straniero'},
        {id: 'mnemosine', img: 'img/mnemosine/mnemosine-1.jpg', height: 200, year: '2016-2017',title: 'Mnemosine'},
        {id: 'chrysalis', img: 'img/chrysalis/chrysalis-13.jpg', height: 200, year: '2016',title: 'Chrysalis'},
        {id: 'radici', img: 'img/radici/radici-1.jpg', height: 200, year: '2015-2016',title: 'Radici'},
    ];

    static init() {
        Clara.setYear();

        window.addEventListener('popstate', (event) => {
            Clara.view();
        });

        Clara.view();

        window.addEventListener('load', Clara.renderProjects);

        //Clara.prevWidth = window.innerWidth;
        //window.addEventListener('resize', () => {
        //    const currentWidth = window.innerWidth;
        //    if(currentWidth > Clara.prevWidth) {
        //        clearTimeout(window.__resizeTimeout);
        //        window.__resizeTimeout = setTimeout(Clara.renderProjects, 200);
        //    }
        //    Clara.prevWidth = currentWidth;
        //});
    }

    static view(viewId = null) {
        if (viewId) {
            history.pushState({}, viewId, (viewId !== '/' ? '?' + viewId : '/'));
        } else {
            const urlParams = new URLSearchParams(window.location.search);
            let $projectList = document.querySelectorAll('.project');
            for (const $project of $projectList) {
                if(urlParams.has($project.getAttribute('data-project'))) {
                    viewId = $project.getAttribute('data-project');
                }
            }

            //viewId = window.location.search.substring(1);
        }

        Clara.showProject((viewId === '/' ? null : viewId));
    }

    static showProject(idProject) {
        let $body = document.querySelector('body');

        // Se non ho passato un id vuol dire che devo chiudere
        if(!idProject) {
            // Tolgo l'overflow:hidden al body
            $body.classList.remove('no-overflow');

            document.querySelector('.project.selected')?.classList.remove('selected');
            return;
        }

        let $project = document.querySelector(`[data-project="${idProject}"]`);
        if(!$project) {
            return;
        }
        $project.classList.add('selected');

        // Aggiungo l'overflow:hidden al body per evitare che interferisca con lo scroll del lavoro
        $body.classList.add('no-overflow');

        new Lightbox($project.querySelectorAll('.project-media'));
    }

    static scrollTo() {
        let $current = document.querySelector('.work.selected');
        let offsetTop = 0;

        let $gallery = $current.querySelector('.work-gallery');
        $gallery.scroll({
            top: offsetTop,
            behavior: 'smooth'
        });
    }

    static scrollDown($el) {
        let $current = document.querySelector('.work.selected');
        let scrollTop = $current.querySelector('.work-gallery').scrollTop + 500;
        let $gallery = $current.querySelector('.work-gallery');

        // se sono al fondo torno su
        if ($el.classList.contains('is-bottom')) {
            scrollTop = 0;
        }

        $gallery.scroll({
            top: scrollTop ,
            behavior: 'smooth'
        });
    }

    static setYear() {
        document.querySelector('.year').innerHTML = new Date().getFullYear();
    }

    static getColumnCount(containerWidth) {
        if (containerWidth < 768) return 1;
        if (containerWidth < 1024) return 2;
        if (containerWidth < 1440) return 3;
        return 4;
    }

    static isMobile() {
        const mediaQuery = window.matchMedia('(max-width: 425px)');

        return mediaQuery.matches;
    }

    static renderProjects() {
        let container = document.querySelector('.project-list');
        container.innerHTML = ''; // pulisci prima
        const containerWidth = container.getBoundingClientRect().width;
        const colCount = Clara.getColumnCount(containerWidth);
        const columns = [];

        for (let i = 0; i < colCount; i++) {
            const col = document.createElement('div');
            col.className = 'project-column';
            container.appendChild(col);
            columns.push(col);
        }

        Clara.projects.forEach((project, index) => {
            const item = document.createElement('div');
            item.className = 'project-item';
            if (project.id) {
                item.setAttribute('onclick', `Clara.view('${project.id}')`);
            } else {
                item.classList.add('intro');
            }
            //item.setAttribute('style', `height: ${project.height}px;`);
            const height = (project.img || project.video ? (Math.floor((Clara.isMobile() ? 200 : 300) + Math.random() * 300)) : 10);
            const img = (project.img ? `<div class="project-img-container"><div class="project-img" style="height:${height}px;background-image: url(${project.img})"></div></div>` : '');
            const video = (project.video ? `<div class="project-img-container" style="height:${height}px;"><video class="project-video" autoplay muted loop playsinline  src="${project.video}"></video></div>` : '');
            const year = (project.year ? '<div class="project-item-year">' + project.year + '</div>' : '');
            const title = (project.title ? '<div class="project-item-title">' + project.title + '</div>' : '');
            item.innerHTML = `${img}${video}${title}${year}`;
            // Inserisci in colonna a rotazione
            columns[index % colCount].appendChild(item);
        });
    }
};

class Lightbox {
    constructor($mediaElements) {
        this.mediaElements = Array.from($mediaElements);
        this.currentIndex = 0;
        this.buildOverlay();
        this.attachEvents();
    }

    buildOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'lightbox-overlay';

        // Wrapper per media (img/video)
        this.mediaWrapper = document.createElement('div');
        this.mediaWrapper.className = 'lightbox-media-wrapper';
        this.overlay.appendChild(this.mediaWrapper);

        // Elemento per immagine
        this.imgElement = document.createElement('img');
        this.imgElement.style.display = 'none';
        this.mediaWrapper.appendChild(this.imgElement);

        // Elemento per video (senza controls)
        this.videoElement = document.createElement('video');
        this.videoElement.style.display = 'none';
        this.videoElement.setAttribute('playsinline', '');
        this.videoElement.setAttribute('muted', '');
        this.mediaWrapper.appendChild(this.videoElement);

        // Overlay grafico play/pause
        this.videoOverlay = document.createElement('div');
        this.videoOverlay.className = 'lightbox-video-overlay';
        this.videoOverlay.style.display = 'none';
        this.mediaWrapper.appendChild(this.videoOverlay);

        // Icona play/pause SVG
        this.iconPlay = document.createElement('div');
        this.iconPlay.className = 'lightbox-video-icon';
        this.iconPlay.innerHTML = `
            <svg width="64" height="64" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="30" fill="rgba(0,0,0,0.5)"/>
                <polygon points="26,20 26,44 46,32" fill="#fff"/>
            </svg>
        `;
        this.videoOverlay.appendChild(this.iconPlay);

        this.iconPause = document.createElement('div');
        this.iconPause.className = 'lightbox-video-icon';
        this.iconPause.style.display = 'none';
        this.iconPause.innerHTML = `
            <svg width="64" height="64" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="30" fill="rgba(0,0,0,0.5)"/>
                <rect x="24" y="20" width="6" height="24" fill="#fff"/>
                <rect x="34" y="20" width="6" height="24" fill="#fff"/>
            </svg>
        `;
        this.videoOverlay.appendChild(this.iconPause);

        this.btnClose = document.createElement('div');
        this.btnClose.className = 'lightbox-btn lightbox-close';
        this.btnClose.innerText = '✕';
        this.overlay.appendChild(this.btnClose);

        this.btnPrev = document.createElement('div');
        this.btnPrev.className = 'lightbox-btn lightbox-prev';
        this.btnPrev.innerText = '⟵';
        this.overlay.appendChild(this.btnPrev);

        this.btnNext = document.createElement('div');
        this.btnNext.className = 'lightbox-btn lightbox-next';
        this.btnNext.innerText = '⟶';
        this.overlay.appendChild(this.btnNext);

        document.body.appendChild(this.overlay);
    }

    attachEvents() {
        this.mediaElements.forEach((el, index) => {
            el.addEventListener('click', () => this.show(index));
        });

        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay || e.target === this.btnClose) {
                this.hide();
            }
        });

        this.btnNext.addEventListener('click', (e) => {
            e.stopPropagation();
            this.next();
        });

        this.btnPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            this.prev();
        });

        document.addEventListener('keydown', (e) => {
            if (!this.overlay.classList.contains('show')) return;
            if (e.key === 'Escape') this.hide();
            if (e.key === 'ArrowRight') this.next();
            if (e.key === 'ArrowLeft') this.prev();
        });

        // Play/Pause overlay click
        this.videoOverlay.addEventListener('click', (e) => {
            e.stopPropagation();
            if (this.videoElement.paused) {
                this.videoElement.play();
            } else {
                this.videoElement.pause();
            }
        });

        // Mostra/nascondi icona pausa solo su hover
        this.videoOverlay.addEventListener('mouseenter', () => {
            if (!this.videoElement.paused) {
                this.iconPause.style.display = '';
            }
        });
        this.videoOverlay.addEventListener('mouseleave', () => {
            if (!this.videoElement.paused) {
                this.iconPause.style.display = 'none';
            }
        });
        this.videoElement.addEventListener('mouseenter', () => {
            if (!this.videoElement.paused) {
                this.iconPause.style.display = '';
            }
        });
        this.videoElement.addEventListener('mouseleave', () => {
            if (!this.videoElement.paused) {
                this.iconPause.style.display = 'none';
            }
        });

        // Aggiorna icona play/pause
        this.videoElement.addEventListener('play', () => {
            this.iconPlay.style.display = 'none';
            this.iconPause.style.display = 'none';
        });
        this.videoElement.addEventListener('pause', () => {
            this.iconPlay.style.display = '';
            this.iconPause.style.display = 'none';
        });
    }

    show(index) {
        this.currentIndex = index;
        const el = this.mediaElements[this.currentIndex];
        // Nascondi tutto
        this.imgElement.style.display = 'none';
        this.videoElement.style.display = 'none';
        this.videoOverlay.style.display = 'none';
        this.videoElement.pause();
        // Mostra immagine o video
        if (el.tagName === 'IMG') {
            this.imgElement.src = el.src;
            this.imgElement.style.display = '';
        } else if (el.tagName === 'VIDEO') {
            this.videoElement.src = el.src || el.querySelector('source')?.src || '';
            this.videoElement.style.display = '';
            this.videoOverlay.style.display = '';
            this.iconPlay.style.display = '';
            this.iconPause.style.display = 'none';
            // Avvia il video in automatico
            this.videoElement.play();
        }
        this.overlay.classList.add('show');
    }

    hide() {
        this.overlay.classList.remove('show');
        this.videoElement.pause();
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.mediaElements.length;
        this.show(this.currentIndex);
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.mediaElements.length) % this.mediaElements.length;
        this.show(this.currentIndex);
    }
}

Clara.init();