const form = document.getElementById('ticket-form');

const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-input');
const uploadedImage = document.getElementById('uploaded-image');
const messageAction = document.getElementById('message-action');
const fileActions = document.getElementById('file-actions');
const removeImage = document.getElementById('remove-image');
const changeImage = document.getElementById('change-image');
const uploadHint = document.getElementById('upload-hint');

const textInputs = document.querySelectorAll('.required');

const formData = {
    image: '',
    name: '',
    email: '',
    githubUsername: ''
};

function validateTextInputs() {
  let isValid = true;

  textInputs.forEach(input => {
      if (input.value.trim() === '') {
          input.classList.add('error');
          isValid = false;
      } else {
          input.classList.remove('error');
      }
  });

  return isValid;
}

function validateFile(input, hint) {
    const file = input.files[0];
    let isValid = true;

    if (!file) {
        hint.classList.add('error');
        hint.innerHTML = 'Por favor, carregue uma foto.';
        isValid = false;
    } else {
        const validTypes = ['image/jpeg', 'image/png'];
        const maxSize = 500 * 1024; // 500KB

        if (!validTypes.includes(file.type)) {
            hint.classList.add('error');
            hint.innerHTML = 'Tipo inválido! Apenas JPG ou PNG.';
            input.value = '';
            isValid = false;
        } else if (file.size > maxSize) {
            hint.classList.add('error');
            hint.innerHTML = 'Imagem muito grande! Máximo 500KB.';
            input.value = '';
            isValid = false;
        } else {
            hint.classList.remove('error');
            hint.innerHTML = 'Carregue sua foto (JPG ou PNG, máx: 500KB).';
            displayUploadedImage(file); // Exibe a imagem carregada
        }
    }

    return isValid;
}

function displayUploadedImage(file) {
  const reader = new FileReader();

  reader.onload = e => {
      const displayImage = document.getElementById('display-image');
      displayImage.src = e.target.result;
      displayImage.style.display = 'block';
      fileActions.classList.add('show');
      messageAction.classList.add('hide');
  };

  reader.readAsDataURL(file);
}

function resetUpload() {
    fileInput.value = '';
    uploadedImage.src = '';
    uploadedImage.style.display = 'none';
    messageAction.classList.remove('hide');
    fileActions.classList.remove('show');
    uploadHint.classList.remove('error');
    uploadHint.innerHTML = 'Carregue sua foto (JPG ou PNG, máx: 500KB).';
}

function storeAndDisplayFormData() {
  formData.image = document.getElementById('display-image').src;
  formData.name = document.getElementById('name').value.trim();
  formData.email = document.getElementById('email').value.trim();
  formData.githubUsername = document.getElementById('github').value.trim();

  document.getElementById('header-name').textContent = formData.name;
  document.getElementById('display-name').textContent = formData.name;
  document.getElementById('display-email').textContent = formData.email;
  document.getElementById('display-github').textContent = formData.githubUsername;
  document.getElementById('display-image').src = formData.image;
}

// Clique para selecionar arquivo
dropArea.addEventListener('click', () => {
    fileInput.click();
});

// Arrastar e soltar funcionalidade
dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('drag-over');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('drag-over');
});

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.classList.remove('drag-over');

    const files = e.dataTransfer.files;
    if (files.length > 0) {
        fileInput.files = files;
        validateFile(fileInput, uploadHint);
    }
});

// Quando o usuário escolhe um arquivo pelo botão
fileInput.addEventListener('change', () => {
    validateFile(fileInput, uploadHint);
});

// Remover imagem
removeImage.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    resetUpload();
});

// Alterar imagem
changeImage.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    fileInput.click();
});

// Validação do formulário
form.addEventListener('submit', e => {
  e.preventDefault();

  const isTextValid = validateTextInputs();
  const isFileValid = validateFile(fileInput, uploadHint);

  if (isTextValid && isFileValid) {
      storeAndDisplayFormData();

      document.getElementById('form-content').classList.add('hide');
      document.querySelector('.display-data').style.display = 'block';
  }
});
