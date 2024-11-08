function addEventToCalendar(titulo, fechaInicio, fechaFin, ubicacion, descripcion) {
    const fechaInicioFormateada = fechaInicio.toISOString().replace(/-|:|\.\d+/g, '');
    const fechaFinFormateada = fechaFin ? fechaFin.toISOString().replace(/-|:|\.\d+/g, '') : '';

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(titulo)}&dates=${fechaInicioFormateada}/${fechaFinFormateada}&location=${encodeURIComponent(ubicacion)}&details=${encodeURIComponent(descripcion)}`;

    window.open(url, '_blank');
}