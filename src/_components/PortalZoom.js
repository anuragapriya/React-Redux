const PortalZoom = () => {

    const setzoom125 = () => {
        const element = document.getElementById('zoomadd')
        element.classList.remove('zoom100')
        element.classList.remove('zoom150')
        element.classList.add('zoom125')


    }
    const setzoom100 = () => {
        const element = document.getElementById('zoomadd')
        element.classList.remove('zoom125')
        element.classList.remove('zoom150')
        element.classList.add('zoom100')


    }
    const setzoom150 = () => {
        const element = document.getElementById('zoomadd')
        element.classList.remove('zoom100')
        element.classList.remove('zoom125')
        element.classList.add('zoom150')
    }

    return (<>
        <div className=" p-0">
            <div className="row m-0">
                <div className="zoom" id="zoomadd">
                    <div className=" login-container" >
                        <div className="App">
                            <button className="add" onClick={setzoom125}>
                                125</button>
                            <button className="remove" onClick={setzoom100}>
                                100</button>
                            <button className="toggle" onClick={setzoom150}> 150
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default PortalZoom;