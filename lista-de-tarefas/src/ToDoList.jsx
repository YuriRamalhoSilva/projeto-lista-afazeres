import React, { useState , useEffect } from "react";

import './ToDoList.css';

function ToDoList () {

    const listaStorage = localStorage.getItem('Lista');

    const [lista,setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []);
    const [novoItem, setNovoItem] = useState([]);
    let urlImg = "https://cdni.iconscout.com/illustration/premium/thumb/lista-de-desejos-vazia-11941567-9741055.png?f=webp"

    useEffect(()=>{
        localStorage.setItem('Lista', JSON.stringify(lista));
    } , [lista])

    function adicionaItem(form) {
        form.preventDefault();

        if(!novoItem) {
            return;
        } 
        setLista([...lista, { text: novoItem, isCompleted: false}])
        setNovoItem("");
        document.getElementById('input-entrada').focus();
    }

    function clicou(index){
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux);
    }

    function deletar(index){
        const listaAux = [...lista];
        listaAux.splice(index, 1);
        setLista(listaAux);
    }

    function deletarTodas(){
        setLista([]);
    }

    return (
        <div>
            <h1>Lista de Tarefas</h1>
            <form onSubmit={adicionaItem}>
                <input type="text" placeholder="Adicione uma tarefa" 
                    id="input-entrada"
                    value={novoItem} 
                    onChange={(e) => {setNovoItem(e.target.value)}}/>
                
                <button type="submit" className="add">Add</button>

            </form>
            <div className="listaTarefas">
                {
                    lista.length <1
                    ?
                    <img src= {urlImg}/>
                    :
                    lista.map((item, index) => (
                        <div key={index} className={item.isCompleted ? "item completo" : "item"}>
                            <span onClick={() => {clicou(index)}} >{item.text}</span>
                            <button className="del" onClick={() => {deletar(index)}} >Delete</button>
                        </div>
                         
                    ))

                }

                {
                    lista.length > 0
                    ?
                    <button className="del-all" onClick={()=>{deletarTodas()}}>Deletar Todas</button>
                    :
                    <></>
                }
                {
                    lista.length < 1
                    ?
                    <h1>\Eu Amo o BOlsonaro</h1>
                    :
                    <></>
                }
                                


            </div>
        </div>
    )
}

export default ToDoList
