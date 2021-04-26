const arrayComments = [];
const comments = document.getElementById("comentarios");
const comment = document.getElementById("input_comentario");
const user = document.getElementById("input_usuario");
drawComments();

function addComment() {
    if(userLengthInvalid()) return
    if(commentLengthInvalid()) return
    const valueComment = comment.value;
    const valueUser = user.value;
    const comentario = {
        usuario: valueUser,
        descripcion: valueComment,
        fecha: new Date()
    }
    arrayComments.unshift(comentario);
    drawComments();
    cleanForm();
}

function drawComments() {
    if(arrayComments.length > 4) {
        arrayComments.pop();
    }
    comments.innerHTML = arrayComments.map((comentario) => createComment(comentario)).join('');
}

function createComment(comentario) {
    return `<div class="comentario">
        <h3 class="usuario" >${comentario.usuario}</h3>
        <div class="descripcion" >${comentario.descripcion}</div>
        <h5 class="fecha" >${comentario.fecha}</h5>
    </div>`;
}

function cleanForm() {
    comment.value = '';
    user.value = '';
}

function userLengthInvalid() {
    var userValue = user.value;
    if(userValue.length < 3) {
        Alerta.show("Usuario muy corto, mínimo 3 caracteres.");
        return true;
    }
    return false;
}

function commentLengthInvalid() {
    var commentValue = comment.value;
    if(commentValue.length < 1 || commentValue.length > 200) {
        Alerta.show("Comentario muy corto (mínimo 1) o muy largo (máximo 200).");
        return true;
    }
    return false;
}



const Alerta = {
    init() {
        this.hideTimeout = null;
        this.el = document.createElement("div");
        this.el.className = "alerta";
        document.body.appendChild(this.el);
    },
  
    show(message) {
        clearTimeout(this.hideTimeout);

        this.el.textContent = message;
        this.el.className = "alerta alerta--visible";

        this.hideTimeout = setTimeout(() => {
            this.el.classList.remove("alerta--visible");
        }, 3000);
    }
};
  
document.addEventListener("DOMContentLoaded", () => Alerta.init());