document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const images = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-btn.next');
    const prevButton = document.querySelector('.carousel-btn.prev');
    let currentIndex = 0;

    // Se calcula el ancho de una imagen de forma dinámica
    const getCarouselImageWidth = () => images[0].getBoundingClientRect().width;
    let imageWidth = getCarouselImageWidth();

    const setPosition = (index) => {
        track.style.transform = `translateX(-${index * imageWidth}px)`;
        currentIndex = index;
    };

    nextButton.addEventListener('click', () => {
        if (currentIndex < images.length - 1) {
            setPosition(currentIndex + 1);
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            setPosition(currentIndex - 1);
        }
    });

    // Modal functionality
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalClient = document.getElementById('modal-client');
    const modalLocation = document.getElementById('modal-location');
    const modalDuration = document.getElementById('modal-duration');
    const modalRole = document.getElementById('modal-role');
    const closeBtn = document.querySelector('.close-btn');

    images.forEach(image => {
        image.addEventListener('click', () => {
            const projectData = {
                title: image.dataset.title || 'Título del Proyecto',
                description: image.dataset.description || 'Descripción detallada del proyecto.',
                client: image.dataset.client || 'Cliente del Proyecto',
                location: image.dataset.location || 'Ubicación del Proyecto',
                duration: image.dataset.duration || 'Duración del Proyecto',
                role: image.dataset.role || 'Mi Rol en el Proyecto'
            };
            
            modalImage.src = image.src;
            modalImage.alt = image.alt;
            modalTitle.textContent = projectData.title;
            modalDescription.textContent = projectData.description;
            modalClient.textContent = projectData.client;
            modalLocation.textContent = projectData.location;
            modalDuration.textContent = projectData.duration;
            modalRole.textContent = projectData.role;
            modal.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Actualiza el tamaño del carrusel si la ventana cambia de tamaño
    window.addEventListener('resize', () => {
        imageWidth = getCarouselImageWidth();
        setPosition(currentIndex);
    });

    setPosition(0);
});