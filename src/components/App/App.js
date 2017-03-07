import React from 'react';
import DraggableAnimals from '../DraggableAnimals/DraggableAnimals';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import '../../App.css'

export default (props) => (
    <div className="App">
        <header className="App-header">
            <Header />
        </header>
        <main className="App-main">
            <DraggableAnimals />
        </main>
        <footer className="App-footer">
            <Footer />
        </footer>
    </div>

)