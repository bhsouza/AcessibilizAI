import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { run } from './components/Gemini.js'
import styles from './Home.module.css'

const Home = () => {
  async function handleResponse(event) {
    event.preventDefault();
    const acessibilidade = document.getElementById('acessibilidade').value
    const teste2 = await run(`Verifique a acessibilidade:\n${acessibilidade}`);
    console.log(teste2)
    console.log(teste2[0])
    const codigoTratado = await escapeHtml(teste2[1]);
    let div = document.createElement('div');
    div.innerHTML = "<pre class='code'>" + codigoTratado + "</pre>";
    document.getElementById("codigo").appendChild(div);
    document.getElementById('melhorias').innerHTML = teste2[0];
  }
  async function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
  }
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Essa é a descrição da home"/>
      </Helmet>
      <main className='container mainContainer'>
        <section>
          <h1 className={styles.title}>Acessibilidade HTML</h1>
          <form onSubmit={handleResponse}>
            <label htmlFor="acessibilidade">Verifique a acessibilidade do seu código HTML:</label>
            <textarea name="acessibilidade" id="acessibilidade"></textarea>
            <button className={styles.button1}>Enviar</button>
          </form>
        </section>
        <section>
          <div id='melhorias' className={styles.melhorias}></div>
          <div id='codigo' className={styles.code}></div>
        </section>
      </main>
    </>
  )
}

export default Home