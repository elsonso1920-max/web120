(function(){

const INSCRIPTIONS_API_URL =
  'https://script.google.com/macros/s/AKfycbwIXceCYbE7soBa9hf2M-oMT6DxVKeDQgtIriCq3a2feZf9zufJGU-diVgG3NltusqH/exec';


const form =
  document.getElementById('enrollmentForm');

const step1 =
  document.getElementById('step1');

const step2 =
  document.getElementById('step2');

const next =
  document.getElementById('nextStep');

const back =
  document.getElementById('backStep');

const message =
  document.getElementById('formMessage');

const personTitle =
  document.getElementById('personTitle');

const schoolQuestions =
  document.getElementById('schoolQuestions');

const tutorBox =
  document.getElementById('tutorBox');

const hermanoBox =
  document.getElementById('hermanoBox');

const nombreHermano =
  document.getElementById('nombreHermano');

const curso =
  document.getElementById('curso');

const cursoBox =
  document.getElementById('cursoBox');

const cursoLabel =
  document.getElementById('cursoLabel');

const especialidadBox =
  document.getElementById('especialidadBox');

const especialidad =
  document.getElementById('especialidad');

const dni =
  document.getElementById('dni');

const tutorDni =
  document.getElementById('tutorDni');

const telefono =
  document.getElementById('telefono');

let nivel = '';


/* =========================================================
   ESPECIALIDAD SEGÚN NIVEL Y CURSO
========================================================= */

function actualizarEspecialidad(){
  const nivelSeleccionado =
    document.querySelector('input[name="nivel"]:checked')?.value || '';

  const cursoSeleccionado = curso.value || '';

console.log('CURSO:', cursoSeleccionado);

  const mostrar =
    nivelSeleccionado === 'Secundario' &&
    ['4', '5', '6'].includes(cursoSeleccionado);

if (mostrar) {
    especialidadBox.style.setProperty('display', 'block', 'important');
    especialidadBox.hidden = false;
    especialidad.disabled = false;
    especialidad.required = true;
  } else {
    especialidadBox.style.setProperty('display', 'none', 'important');
    especialidadBox.hidden = true;
    especialidad.disabled = false;
    especialidad.required = false;
    especialidad.value = '';
  }
}


/* =========================================================
   CURSOS SEGÚN NIVEL
========================================================= */

function actualizarCursos(){

  nivel =
    document.querySelector(
      'input[name="nivel"]:checked'
    )?.value || '';


  if(nivel === 'Terciario'){

    cursoBox.style.display = 'none';

    curso.required = false;
    curso.value = '';

    actualizarEspecialidad();

    return;

  }


  cursoBox.style.display =
    'block';

  curso.required =
    true;


  const actual =
    curso.value;


  if(nivel === 'Inicial'){

    cursoLabel.textContent =
      '¿A qué sala ingresaría? *';


    curso.innerHTML = `

      <option value="">
        Seleccionar sala
      </option>

      <option value="Sala de 3">
        Sala de 3
      </option>

      <option value="Sala de 4">
        Sala de 4
      </option>

      <option value="Sala de 5">
        Sala de 5
      </option>

    `;

  }

  else{

    cursoLabel.textContent =
      '¿A qué curso ingresaría? *';


    curso.innerHTML = `

      <option value="">
        Seleccionar curso
      </option>

      <option value="1">
        1
      </option>

      <option value="2">
        2
      </option>

      <option value="3">
        3
      </option>

      <option value="4">
        4
      </option>

      <option value="5">
        5
      </option>

      <option value="6">
        6
      </option>

    `;

  }


  if(
    [...curso.options].some(
      option =>
        option.value === actual
    )
  ){

    curso.value =
      actual;

  }


  actualizarEspecialidad();

}


/* =========================================================
   ACTUALIZAR FORMULARIO
========================================================= */

function actualizar(){

  nivel =
    document.querySelector(
      'input[name="nivel"]:checked'
    )?.value || '';


  const esTerciario =
    nivel === 'Terciario';


  personTitle.textContent =
    esTerciario
      ? 'Datos de la persona'
      : 'Datos del estudiante';


  schoolQuestions.classList.toggle(
    'visible',
    !esTerciario
  );


  tutorBox.classList.toggle(
    'visible',
    !esTerciario
  );


  document.getElementById(
    'hermanosSi'
  ).required =
    !esTerciario;


  document.getElementById(
    'hermanosNo'
  ).required =
    !esTerciario;


  document.getElementById(
    'tutorNombre'
  ).required =
    !esTerciario;


  tutorDni.required =
    !esTerciario;


  nombreHermano.required =
    document.getElementById(
      'hermanosSi'
    ).checked &&
    !esTerciario;


  actualizarEspecialidad();

}


/* =========================================================
   CAMBIO DE NIVEL
========================================================= */

document
  .querySelectorAll(
    'input[name="nivel"]'
  )
  .forEach(
    radio => {

      radio.addEventListener(
        'change',
        () => {

          actualizar();

          actualizarCursos();

          actualizarEspecialidad();

        }
      );

    }
  );


/* =========================================================
   CAMBIO DE CURSO
========================================================= */

curso.addEventListener(
  'change',
  actualizarEspecialidad
);

/* =========================================================
   HERMANOS
========================================================= */

document
  .querySelectorAll(
    'input[name="hermanos"]'
  )
  .forEach(
    radio => {

      radio.addEventListener(
        'change',
        () => {

          const si =
            document.getElementById(
              'hermanosSi'
            ).checked;


          hermanoBox.style.display =
            si
              ? 'flex'
              : 'none';


          nombreHermano.required =
            si;


          if(!si){

            nombreHermano.value =
              '';

          }

        }
      );

    }
  );


/* =========================================================
   SOLO NÚMEROS
========================================================= */

[
  dni,
  tutorDni,
  telefono
].forEach(
  input => {

    input.addEventListener(
      'input',
      () => {

        input.value =
          input.value.replace(
            /\D/g,
            ''
          );

      }
    );

  }
);


/* =========================================================
   PASAR AL PASO 2
========================================================= */

next.addEventListener(
  'click',
  () => {

    if(
      !document.querySelector(
        'input[name="nivel"]:checked'
      )
    ){

      message.className =
        'form-message error';

      message.textContent =
        'Seleccioná un nivel para continuar.';

      return;

    }


    message.className =
      'form-message';


    actualizar();

    actualizarCursos();

    actualizarEspecialidad();


    step1.classList.remove(
      'active'
    );


    step2.classList.add(
      'active'
    );

  }
);


/* =========================================================
   VOLVER AL PASO 1
========================================================= */

back.addEventListener(
  'click',
  () => {

    step2.classList.remove(
      'active'
    );


    step1.classList.add(
      'active'
    );


    message.className =
      'form-message';

  }
);


/* =========================================================
   ENVIAR INSCRIPCIÓN
========================================================= */

form.addEventListener(
  'submit',
  async function(e){

    e.preventDefault();


    actualizarEspecialidad();


    actualizar();


    if(
      !form.checkValidity()
    ){

      form.reportValidity();

      return;

    }


    nivel =
      document.querySelector(
        'input[name="nivel"]:checked'
      )?.value || '';


    if(!nivel){

      message.className =
        'form-message error';

      message.textContent =
        'Seleccioná un nivel.';

      return;

    }


    message.className =
      'form-message success';

    message.textContent =
      'Enviando solicitud...';


    const datos = {

      action:
        'guardarInscripcion',

      nivel:
        nivel.toLowerCase(),

      nombre:
        document
          .getElementById('nombre')
          .value
          .trim(),

      dni:
        document
          .getElementById('dni')
          .value
          .trim(),

      fechaNacimiento:
        document
          .getElementById('nacimiento')
          .value,

      domicilio:
        document
          .getElementById('domicilio')
          .value
          .trim(),

      ciudad:
        document
          .getElementById('ciudad')
          .value
          .trim(),

      telefono:
        document
          .getElementById('telefono')
          .value
          .trim(),

      gmail:
        document
          .getElementById('email')
          .value
          .trim(),

      hermanos:
        document.querySelector(
          'input[name="hermanos"]:checked'
        )?.value || '',

      nombreHermano:
        document
          .getElementById('nombreHermano')
          .value
          .trim(),

      padreTutor:
        document
          .getElementById('tutorNombre')
          .value
          .trim(),

      dniPadreTutor:
        document
          .getElementById('tutorDni')
          .value
          .trim(),

      curso:
        '',

      especialidad:
        ''

    };


    /* =====================================================
       INICIAL
    ===================================================== */

    if(
      nivel === 'inicial'
    ){

      datos.sala =
        curso.value;

    }


    /* =====================================================
       PRIMARIO
    ===================================================== */

    if(
      nivel === 'primario'
    ){

      datos.curso =
        curso.value;

    }


    /* =====================================================
       SECUNDARIO
    ===================================================== */

    if(
      nivel === 'secundario'
    ){

      datos.curso =
        curso.value;


      if(
        ['4', '5', '6'].includes(
          curso.value
        )
      ){

        datos.especialidad =
          especialidad.value.trim();

      }

      else{

        datos.especialidad =
          '';

      }

    }


    /* =====================================================
       TERCIARIO
    ===================================================== */

    if(
      nivel === 'terciario'
    ){

      datos.curso =
        '';

      datos.especialidad =
        '';

      datos.hermanos =
        '';

      datos.nombreHermano =
        '';

      datos.padreTutor =
        '';

      datos.dniPadreTutor =
        '';

    }


    console.log(
      'DATOS QUE SE ENVIAN:',
      datos
    );


    /* =====================================================
       ENVÍO A INSCRIPCIONES.GS
    ===================================================== */

    try{

      const respuesta =
        await fetch(
          INSCRIPTIONS_API_URL,
          {

            method:
              'POST',

            headers: {

              'Content-Type':
                'text/plain;charset=utf-8'

            },

            body:
              JSON.stringify(
                datos
              )

          }
        );


      const texto =
        await respuesta.text();


      console.log(
        'RESPUESTA INSCRIPCIONES:',
        texto
      );


      let resultado;


      try{

        resultado =
          JSON.parse(
            texto
          );

      }

      catch(error){

        throw new Error(
          'La aplicación de inscripciones devolvió una respuesta inválida.'
        );

      }


      if(
        !resultado.ok
      ){

        throw new Error(
          resultado.message ||
          'No se pudo registrar la inscripción.'
        );

      }


      message.className =
        'form-message success';


      message.textContent =
        '¡Listo! La solicitud de inscripción fue registrada correctamente.';


      form.reset();


      step2.classList.remove(
        'active'
      );


      step1.classList.add(
        'active'
      );


      cursoBox.style.display =
        'block';


      especialidadBox.style.display =
        'none';


      especialidad.required =
        false;


      especialidad.value =
        '';


      hermanoBox.style.display =
        'none';


      actualizar();

      actualizarCursos();

      actualizarEspecialidad();


    }

    catch(error){

      console.error(
        'ERROR INSCRIPCIONES:',
        error
      );


      message.className =
        'form-message error';


      message.textContent =
        error.message ||
        'No se pudo enviar la solicitud. Intentá nuevamente.';

    }

  }
);

})();

const SPECIALTY_API_URL =
  'https://script.google.com/macros/s/AKfycbzZdwdx1RQ07VrT1mRCOgwMwa8ttTqx12k22Vhrt8FRgEUG4pSuUTEMCe3THWcYZfq-wg/exec';


let specialtyMode =
  'new';

let specialtyVerified =
  false;


function openSpecialty(mode){

  specialtyMode =
    mode;

  specialtyVerified =
    false;


  document
    .getElementById(
      'specialtyPanel'
    )
    .classList.add(
      'open'
    );


  document
    .getElementById(
      'specialtyPanel'
    )
    .setAttribute(
      'aria-hidden',
      'false'
    );


  document
    .getElementById(
      'specialtyLabel'
    )
    .textContent =
      mode === 'new'
        ? 'Para alumnos de 3.º año'
        : 'Solicitud de cambio';


  document
    .getElementById(
      'specialtyTitle'
    )
    .textContent =
      'Verificá tu correo institucional';


  document
    .getElementById(
      'verifyBox'
    )
    .style.display =
      'block';


  document
    .getElementById(
      'codeBox'
    )
    .style.display =
      'none';


  document
    .getElementById(
      'specialtyNewForm'
    )
    .style.display =
      'none';


  document
    .getElementById(
      'specialtyChangeForm'
    )
    .style.display =
      'none';


  window.scrollTo({

    top:
      document
        .getElementById(
          'specialtyPanel'
        )
        .offsetTop - 100,

    behavior:
      'smooth'

  });

}


function closeSpecialty(){

  document
    .getElementById(
      'specialtyPanel'
    )
    .classList.remove(
      'open'
    );


  document
    .getElementById(
      'specialtyPanel'
    )
    .setAttribute(
      'aria-hidden',
      'true'
    );

}


function showMsg(
  id,
  text,
  type = 'error'
){

  const el =
    document.getElementById(
      id
    );

  el.className =
    'form-message ' + type;

  el.textContent =
    text;

}


/* =========================================================
   API ESPECIALIDADES
========================================================= */

async function api(payload){

  const r =
    await fetch(

      SPECIALTY_API_URL,

      {

        method:
          'POST',

        headers: {

          'Content-Type':
            'text/plain;charset=utf-8'

        },

        body:
          JSON.stringify(
            payload
          )

      }

    );


  const text =
    await r.text();


  console.log(
    'RESPUESTA APPS SCRIPT:',
    text
  );


  try{

    return JSON.parse(
      text
    );

  }

  catch(error){

    throw new Error(
      'Apps Script devolvió HTML en lugar de JSON.'
    );

  }

}


async function sendSpecialtyCode(){

  const email =
    document
      .getElementById(
        'specialtyEmail'
      )
      .value
      .trim()
      .toLowerCase();


  if(!email){

    showMsg(
      'verifyMessage',
      'Ingresá tu correo institucional.'
    );

    return;

  }


  try{

    const data =
      await api({

        action:
          'sendCode',

        email:
          email

      });


    showMsg(

      'verifyMessage',

      data.message,

      data.ok
        ? 'success'
        : 'error'

    );


    if(data.ok){

      document
        .getElementById(
          'codeBox'
        )
        .style.display =
          'block';


      document
        .getElementById(
          'specialtyCode'
        )
        .focus();

    }

  }

  catch(e){

    showMsg(
      'verifyMessage',
      e.message
    );

  }

}


async function verifySpecialtyCode(){

  const email =
    document
      .getElementById(
        'specialtyEmail'
      )
      .value
      .trim()
      .toLowerCase();


  const code =
    document
      .getElementById(
        'specialtyCode'
      )
      .value
      .trim();


  if(
    code.length !== 6
  ){

    showMsg(
      'codeMessage',
      'Ingresá el código de 6 dígitos.'
    );

    return;

  }


  try{

    const data =
      await api({

        action:
          'verifyCode',

        email:
          email,

        code:
          code

      });


    showMsg(

      'codeMessage',

      data.message,

      data.ok
        ? 'success'
        : 'error'

    );


    if(data.ok){

      specialtyVerified =
        true;


      document
        .getElementById(
          'verifyBox'
        )
        .style.display =
          'none';


      document
        .getElementById(
          'codeBox'
        )
        .style.display =
          'none';


      document
        .getElementById(
          'specialtyTitle'
        )
        .textContent =

          specialtyMode === 'new'

            ? 'Inscripción a especialidad'

            : 'Solicitud de cambio de especialidad';


      document
        .getElementById(

          specialtyMode === 'new'

            ? 'specialtyNewForm'

            : 'specialtyChangeForm'

        )
        .style.display =
          'block';

    }

  }

  catch(e){

    showMsg(
      'codeMessage',
      e.message
    );

  }

}


async function submitSpecialty(e){

  e.preventDefault();


  if(
    !specialtyVerified
  ){

    return;

  }


  const email =
    document
      .getElementById(
        'specialtyEmail'
      )
      .value
      .trim()
      .toLowerCase();


  try{

    const data =
      await api({

        action:
          'saveSpecialty',

        email:
          email,

        nombre:
          document
            .getElementById(
              'newName'
            )
            .value
            .trim(),

        curso:
          '3',

        especialidad:
          document
            .getElementById(
              'newSpecialty'
            )
            .value,

        observaciones:
          document
            .getElementById(
              'newObs'
            )
            .value
            .trim()

      });


    showMsg(

      'newMessage',

      data.message,

      data.ok
        ? 'success'
        : 'error'

    );


    if(data.ok){

      e.target.reset();

    }

  }

  catch(err){

    showMsg(
      'newMessage',
      err.message
    );

  }

}


async function submitChange(e){

  e.preventDefault();


  if(
    !specialtyVerified
  ){

    return;

  }


  const email =
    document
      .getElementById(
        'specialtyEmail'
      )
      .value
      .trim()
      .toLowerCase();


  try{

    const data =
      await api({

        action:
          'saveChange',

        email:
          email,

        nombre:
          document
            .getElementById(
              'changeName'
            )
            .value
            .trim(),

        curso:
          document
            .getElementById(
              'changeCourse'
            )
            .value,

        actual:
          document
            .getElementById(
              'currentSpecialty'
            )
            .value,

        nueva:
          document
            .getElementById(
              'newChangeSpecialty'
            )
            .value,

        motivo:
          document
            .getElementById(
              'changeReason'
            )
            .value
            .trim()

      });


    showMsg(

      'changeMessage',

      data.message,

      data.ok
        ? 'success'
        : 'error'

    );


    if(data.ok){

      e.target.reset();

    }

  }

  catch(err){

    showMsg(
      'changeMessage',
      err.message
    );

  }

}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('openSpecialtyNew')?.addEventListener('click', () => openSpecialty('new'));
  document.getElementById('openSpecialtyChange')?.addEventListener('click', () => openSpecialty('change'));
  document.getElementById('closeSpecialty')?.addEventListener('click', closeSpecialty);
  document.getElementById('sendSpecialtyCodePrimary')?.addEventListener('click', sendSpecialtyCode);
  document.getElementById('sendSpecialtyCodeSecondary')?.addEventListener('click', sendSpecialtyCode);
  document.getElementById('verifySpecialtyCode')?.addEventListener('click', verifySpecialtyCode);
  document.getElementById('specialtyNewForm')?.addEventListener('submit', submitSpecialty);
  document.getElementById('specialtyChangeForm')?.addEventListener('submit', submitChange);
});
