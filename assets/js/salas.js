function renderConferenceRoom() {
    const formHtml = `
    <h2>Reservar Sala de Conferencias</h2>
        <form id="conference-room">
            <div>
                <label for="name">Nombre:</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div>
                <label for="email">Correo Electrónico:</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div>
                <label for="date">Fecha:</label>
                <input type="date" id="date" name="date" required>
            </div>
            <div>
                <label for="start-time">Hora de Inicio:</label>
                <input type="time" id="start-time" name="start-time" required>
            </div>
            <div>
                <label for="end-time">Hora de Fin:</label>
                <input type="time" id="end-time" name="end-time" required>
            </div>
            <div>
                <label for="room">Sala:</label>
                <select id="room" name="room" required>
                    <option value="sala1">Sala 1</option>
                    <option value="sala2">Sala 2</option>
                </select>
            </div>
            <div>
                <button type="submit">Reservar</button>
            </div>
        </form>
        <button id="buttonHome" onclick="buttonHome()">Regresar</button>
    `;

    document.body.innerHTML = formHtml; // Insertar el formulario en el body
} 

function buttonHome() {
    const qrElement = document.getElementById('qr');
    qrElement.style.display = 'none';
  
    const options = document.getElementById('options');
    options.style.display = 'block';
  
    const home = document.getElementById('home');
    home.style.display = 'block';
  
    const container = document.getElementById('form-container');
    container.style.display = 'none';
    
    const conferenceroom = document.getElementById('conference-room');
    conferenceroom.style.display = 'none';
  }
// Call the function to render the form
//renderConferenceRoom();