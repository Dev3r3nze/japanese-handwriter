import React, { useState, useRef, useEffect } from 'react';
import './App.css'; // Asegúrate de crear un archivo App.css para el estilo


function App() {
  const [history, setHistory] = useState([]); // Guardará el historial de trazos

  const canvasRef = useRef(null);
  const referenceCanvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);


  // ---------------- CARACTERES -----------------------
  const solutions = {
    hiragana: [
      'あ', 'い', 'う', 'え', 'お',
      'か', 'き', 'く', 'け', 'こ',
      'さ', 'し', 'す', 'せ', 'そ',
      'た', 'ち', 'つ', 'て', 'と',
      'な', 'に', 'ぬ', 'ね', 'の',
      'は', 'ひ', 'ふ', 'へ', 'ほ',
      'ま', 'み', 'む', 'め', 'も',
      'や', 'ゆ', 'よ',
      'ら', 'り', 'る', 'れ', 'ろ',
      'わ', 'を', 'ん'
    ],
    katakana: [
      'ア', 'イ', 'ウ', 'エ', 'オ',
      'カ', 'キ', 'ク', 'ケ', 'コ',
      'サ', 'シ', 'ス', 'セ', 'ソ',
      'タ', 'チ', 'ツ', 'テ', 'ト',
      'ナ', 'ニ', 'ヌ', 'ネ', 'ノ',
      'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
      'マ', 'ミ', 'ム', 'メ', 'モ',
      'ヤ', 'ユ', 'ヨ',
      'ラ', 'リ', 'ル', 'レ', 'ロ',
      'ワ', 'ヲ', 'ン'
    ]
  };

  const romaji = {
    hiragana: [
      'a', 'i', 'u', 'e', 'o',
      'ka', 'ki', 'ku', 'ke', 'ko',
      'sa', 'shi', 'su', 'se', 'so',
      'ta', 'chi', 'tsu', 'te', 'to',
      'na', 'ni', 'nu', 'ne', 'no',
      'ha', 'hi', 'fu', 'he', 'ho',
      'ma', 'mi', 'mu', 'me', 'mo',
      'ya', 'yu', 'yo',
      'ra', 'ri', 'ru', 're', 'ro',
      'wa', 'wo', 'n'
    ],
    katakana: [
      'a', 'i', 'u', 'e', 'o',
      'ka', 'ki', 'ku', 'ke', 'ko',
      'sa', 'shi', 'su', 'se', 'so',
      'ta', 'chi', 'tsu', 'te', 'to',
      'na', 'ni', 'nu', 'ne', 'no',
      'ha', 'hi', 'fu', 'he', 'ho',
      'ma', 'mi', 'mu', 'me', 'mo',
      'ya', 'yu', 'yo',
      'ra', 'ri', 'ru', 're', 'ro',
      'wa', 'wo', 'n'
    ]
  };

  const [characterType, setCharacterType] = useState('hiragana');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCharacter, setCurrentCharacter] = useState(romaji[characterType][currentIndex]);


  const nextCharacter = () => {
      clearReferenceImage();  // Borrar la imagen si está visible
      const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % romaji[characterType].length;
      setCurrentCharacter(romaji[characterType][newIndex]);
      return newIndex;
    });
  };

  const previousCharacter = () => {
      clearReferenceImage();  // Borrar la imagen si está visible
      const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + romaji[characterType].length) % romaji[characterType].length;
      setCurrentCharacter(romaji[characterType][newIndex]);
      return newIndex;
    });
  };
  const handleCharacterTypeChange = (e) => {
      clearReferenceImage();  // Borrar la imagen si está visible
      const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const selectedType = e.target.value;
    setCharacterType(selectedType);
    setCurrentIndex(0); // Resetea el índice
    setCurrentCharacter(romaji[selectedType][0]); // Actualiza el carácter
  };



  // ---------------------------- LIEZNO ----------------------------
  const referenceImages = {
    hiragana: {
      a: '/images/hiragana/a.png',
      i: '/images/hiragana/i.png',
      u: '/images/hiragana/u.png',
      e: '/images/hiragana/e.png',
      o: '/images/hiragana/o.png',
      ka: '/images/hiragana/ka.png',
      ki: '/images/hiragana/ki.png',
      ku: '/images/hiragana/ku.png',
      ke: '/images/hiragana/ke.png',
      ko: '/images/hiragana/ko.png',
      sa: '/images/hiragana/sa.png',
      shi: '/images/hiragana/shi.png',
      su: '/images/hiragana/su.png',
      se: '/images/hiragana/se.png',
      so: '/images/hiragana/so.png',
      ta: '/images/hiragana/ta.png',
      chi: '/images/hiragana/chi.png',
      tsu: '/images/hiragana/tsu.png',
      te: '/images/hiragana/te.png',
      to: '/images/hiragana/to.png',
      na: '/images/hiragana/na.png',
      ni: '/images/hiragana/ni.png',
      nu: '/images/hiragana/nu.png',
      ne: '/images/hiragana/ne.png',
      no: '/images/hiragana/no.png',
      ha: '/images/hiragana/ha.png',
      hi: '/images/hiragana/hi.png',
      fu: '/images/hiragana/fu.gif',
      he: '/images/hiragana/he.png',
      ho: '/images/hiragana/ho.png',
      ma: '/images/hiragana/ma.png',
      mi: '/images/hiragana/mi.png',
      mu: '/images/hiragana/mu.png',
      me: '/images/hiragana/me.png',
      mo: '/images/hiragana/mo.png',
      ya: '/images/hiragana/ya.png',
      yu: '/images/hiragana/yu.gif',
      yo: '/images/hiragana/yo.png',
      ra: '/images/hiragana/ra.png',
      ri: '/images/hiragana/ri.png',
      ru: '/images/hiragana/ru.png',
      re: '/images/hiragana/re.png',
      ro: '/images/hiragana/ro.png',
      wa: '/images/hiragana/wa.png',
      wo: '/images/hiragana/wo.png',
      n: '/images/hiragana/n.png'
      // Más imágenes...
    },
    katakana: {
      a: '/images/katakana/a.png',
      i: '/images/katakana/i.png',
      u: '/images/katakana/u.png',
      e: '/images/katakana/e.png',
      o: '/images/katakana/o.png',
      ka: '/images/katakana/ka.png',
      ki: '/images/katakana/ki.png',
      ku: '/images/katakana/ku.png',
      ke: '/images/katakana/ke.png',
      ko: '/images/katakana/ko.png',
      sa: '/images/katakana/sa.png',
      shi: '/images/katakana/shi.png',
      su: '/images/katakana/su.png',
      se: '/images/katakana/se.png',
      so: '/images/katakana/so.png',
      ta: '/images/katakana/ta.png',
      chi: '/images/katakana/chi.png',
      tsu: '/images/katakana/tsu.png',
      te: '/images/katakana/te.png',
      to: '/images/katakana/to.png',
      na: '/images/katakana/na.png',
      ni: '/images/katakana/ni.png',
      nu: '/images/katakana/nu.png',
      ne: '/images/katakana/ne.png',
      no: '/images/katakana/no.png',
      ha: '/images/katakana/ha.png',
      hi: '/images/katakana/hi.png',
      fu: '/images/katakana/fu.png',
      he: '/images/katakana/he.png',
      ho: '/images/katakana/ho.png',
      ma: '/images/katakana/ma.png',
      mi: '/images/katakana/mi.png',
      mu: '/images/katakana/mu.png',
      me: '/images/katakana/me.png',
      mo: '/images/katakana/mo.png',
      ya: '/images/katakana/ya.png',
      yu: '/images/katakana/yu.png',
      yo: '/images/katakana/yo.png',
      ra: '/images/katakana/ra.png',
      ri: '/images/katakana/ri.png',
      ru: '/images/katakana/ru.png',
      re: '/images/katakana/re.png',
      ro: '/images/katakana/ro.png',
      wa: '/images/katakana/wa.png',
      wo: '/images/katakana/wo.png',
      n: '/images/katakana/n.png'
    },
    kanji: {
      ichi: '/images/kanji/ichi.png',
      ni: '/images/kanji/ni.png',
      // Más imágenes...
    }
  };
  const [showReference, setShowReference] = useState(false);


  // Cargar la imagen de referencia y superponerla en el lienzo con baja opacidad
  const drawReferenceImage = (imageSrc) => {
    const canvas = referenceCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = `${process.env.PUBLIC_URL}${imageSrc}`;

    img.onload = () => {
      // Ajustes de tamaño y escala
      const imgWidth = img.width;
      const imgHeight = img.height;
      const scaleFactor = Math.min(canvas.width / imgWidth, canvas.height / imgHeight);
      const newWidth = imgWidth * scaleFactor;
      const newHeight = imgHeight * scaleFactor;
      const xOffset = (canvas.width - newWidth) / 2;
      const yOffset = (canvas.height - newHeight) / 2;

      // Dibujar la imagen con opacidad
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el lienzo de referencia
      ctx.globalAlpha = 0.3; // Transparencia del 30%
      ctx.drawImage(img, xOffset, yOffset, newWidth, newHeight);

      // Restaurar la opacidad
      ctx.globalAlpha = 1.0;
    };
    img.onerror = () => {
      console.error("Error al cargar la imagen", imageSrc);
    };
    
  };


  const clearReferenceImage = () => {
    const canvas = referenceCanvasRef.current;
    const ctx = canvas.getContext('2d');

    // Limpiar solo el lienzo de referencia
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };


  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const saveCanvasState = () => {
      const canvasState = canvas.toDataURL(); // Guardar el estado actual del canvas
      setHistory(prevHistory => [...prevHistory, canvasState]);
    };
    const undoLastDraw = (event) => {
      if (event.ctrlKey && event.key === 'z') {
        if (history.length > 0) {
          const previousState = history[history.length - 1];
          const img = new Image();
          img.src = previousState;
          img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el lienzo
            ctx.drawImage(img, 0, 0); // Restaurar el estado anterior
          };
          setHistory(prevHistory => prevHistory.slice(0, -1)); // Eliminar el último estado del historial
        }
      }
    };

    const startDrawing = (event) => {
      event.preventDefault(); // Evita el comportamiento por defecto en dispositivos táctiles
      setDrawing(true);
      saveCanvasState();
      ctx.beginPath();
      const { offsetX, offsetY } = getEventCoordinates(event);
      ctx.moveTo(offsetX, offsetY);
    };

    const stopDrawing = () => {
      setDrawing(false);
      ctx.closePath();
    };

    const draw = (event) => {
      if (!drawing) return;
      const { offsetX, offsetY } = getEventCoordinates(event);
      ctx.lineWidth = 12;
      ctx.lineCap = 'round';
      ctx.strokeStyle = 'black';
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
    };

    // Obtener las coordenadas correctas dependiendo del tipo de evento
    const getEventCoordinates = (event) => {
      let x, y;
      if (event.touches) {
        // Toma el primer toque si hay más de uno
        x = event.touches[0].clientX - canvas.offsetLeft;
        y = event.touches[0].clientY - canvas.offsetTop;
      } else {
        x = event.clientX - canvas.offsetLeft;
        y = event.clientY - canvas.offsetTop;
      }
      return { offsetX: x, offsetY: y };
    };

    // Agregar los eventos al canvas
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseleave', stopDrawing);

    // Nuevos eventos táctiles y de puntero
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('pointerleave', stopDrawing);

    // Detectar la combinación Ctrl + Z
    document.addEventListener('keydown', undoLastDraw);

    const handleKeyDown = (event) => {
      if (event.code === 'Space') { // Verifica si la tecla presionada es la barra espaciadora
        event.preventDefault(); // Opcional: evitar el comportamiento por defecto de la tecla
        handleCheck(); // Llama a la función handleCheck
      }
    }

    window.addEventListener('keydown', handleKeyDown);


    // Limpiar el canvas
    const clearCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    document.getElementById('clear-canvas').addEventListener('click', clearCanvas);

    // Limpieza de eventos al desmontar el componente
    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mousemove', draw);
      document.getElementById('clear-canvas').removeEventListener('click', clearCanvas);
      canvas.removeEventListener('mousedown', saveCanvasState);
      document.removeEventListener('keydown', undoLastDraw);
      window.removeEventListener('keydown', handleKeyDown);


    };
  }, [drawing]);



  const handleCheck = async () => {
    setShowReference(!showReference);  // Alternar la visibilidad

    if (!showReference) {
      const referenceImageSrc = referenceImages[characterType][currentCharacter];
      drawReferenceImage(referenceImageSrc);  // Dibujar la imagen si no está visible
    } else {
      clearReferenceImage();  // Borrar la imagen si está visible
    }
  };

  // ------------------- LISTA -----------------
  const [showList, setShowList] = useState(false);
  const toggleList = () => {
    setShowList(!showList);
  };
  const handleCharacterClick = (char, romajiChar) => {
    setCurrentCharacter(char);
    setCurrentCharacter(romajiChar);
    clearReferenceImage();  // Borrar la imagen si está visible
    setShowList(false); // Oculta la lista tras seleccionar
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };



  return (
    <div className="app container d-flex">
      <div className='m-auto'>
        {/* Header */}
        <div className="header d-flex justify-content-between align-items-center mb-3 py-2" >
          <select className="select-menu form-select w-auto" onChange={(e) => handleCharacterTypeChange(e)}>
            <option value="hiragana">Hiragana</option>
            <option value="katakana">Katakana</option>
            <option value="kanji">Kanji</option>
          </select>
          <div className="character-display">
            <p>{currentCharacter}</p>
          </div>
          <button className="control-btn btn btn-outline-dark" id="clear-canvas">Limpiar</button>
        </div>

        {/* Canvas Container */}
        <div className="canvas-container d-flex justify-content-center align-items-center rounded-3" >
          <canvas ref={canvasRef} id="canvas" width="400" height="400" className='rounded-3'></canvas>
          <canvas ref={referenceCanvasRef} id="referenceCanvas" width="400" height="400" className='rounded-3 position-absolute' style={{ pointerEvents: 'none', background: "#ffffff00" }}></canvas>

        </div>

        {/* Controls */}
        <div className="controls d-flex justify-content-between align-items-center pt-3 mt-4">
          <div className="left-controls">
            <button className="control-btn btn btn-outline-dark me-2" onClick={previousCharacter}>Anterior</button>
            <button className="control-btn btn btn-outline-dark me-2" onClick={toggleList}>Mostrar Lista</button>
            <button className="control-btn btn btn-outline-dark" onClick={nextCharacter}>Siguiente</button>
          </div>
          <div className="right-controls">
            <button className="control-btn btn btn-danger" onClick={handleCheck}>Show</button>
          </div>
        </div>
      </div>

      {/* Lista */}
      {showList && (
        <div className="character-list-div position-absolute end-50 top-50 p-3">
          <p>Lista de caracteres ({characterType})</p>
          <div className='character-list  bg-white border rounded-3'>
            <div className="row row-cols-5">
              {romaji[characterType].map((romajiChar, index) => (
                <div className="col mb-2" key={romajiChar}>
                  <button
                    className={`btn m-1 w-100 ${romajiChar === currentCharacter ? 'btn-outline-danger' : 'btn-outline-secondary'}`}
                    style={{
                      borderColor: romajiChar === currentCharacter ? '#b23a3a' : undefined,
                      backgroundColor: romajiChar === currentCharacter ? '#f8d7da' : undefined,
                      fontWeight: romajiChar === currentCharacter ? 'bold' : undefined
                    }}
                    onClick={() => handleCharacterClick(solutions[characterType][index], romajiChar)}
                  >
                    {solutions[characterType][index]}<br />({romajiChar})
                  </button>
                </div>
              ))}   

            </div>
          </div>
        </div>
      )}




    </div>

  );
}

export default App;
