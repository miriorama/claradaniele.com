class Clara {
    static method = 'method';
    static exhibition = 'exhibition';

    static init() {

        Clara.setYear();

        window.addEventListener('popstate', (event) => {
            Clara.view();
        });
        Clara.view();
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
            $body.classList.remove('o-hidden');

            document.querySelector('.project.selected')?.classList.remove('selected');
            return;
        }

        let $project = document.querySelector(`[data-project="${idProject}"]`);
        if(!$project) {
            return;
        }
        $project.classList.add('selected');

        // Aggiungo l'overflow:hidden al body per evitare che interferisca con lo scroll del lavoro
        $body.classList.add('o-hidden');
    }

    static scrollTo(target) {
        let $current = document.querySelector('.work.selected');

        let offsetTop;
        if (target === Clara.EXHIBITION) {
            offsetTop = $current.querySelector('.gallery-separator').offsetTop;
        } else {
            offsetTop = 0;
        }

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

    static projectListToggle(){
        document.querySelector('main').classList.toggle('show-project-list')
    }
};

Clara.init();