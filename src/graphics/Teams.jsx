import Panthers from '../assets/Panthers.webp'

function Teams() {
    return (
        <>
            <div style={{ backgroundColor: '#313131', width: '30rem' }} className="teamsListDiv">
                <div className="left">
                    <div className="circle">
                        <img src={Panthers} alt="" />
                    </div>
                    <div>
                        <h2>Penrith</h2>
                        <h1>Panthers</h1>
                    </div>
                </div>
                <div className="backs">
                    <hr />
                    <p>BACKS</p>
                    <hr />
                    <ul>
                        <li>Dylan <b>Edwards</b></li>
                        <li>Casey <b>McLean</b></li>
                        <li>Izack <b>Tago</b></li>
                        <li>Luke <b>Garner</b></li>
                        <li>Paul <b>Alamoti</b></li>
                        <li>Jack <b>Cole</b></li>
                        <li>Nathan <b>Cleary</b> (co-captain)</li>
                    </ul>
                </div>
                <div className="forwards">
                    <hr />
                    <p>FORWARDS</p>
                    <hr />
                    <ul>
                        <li>Moses <b>Leota</b></li>
                        <li>Mitch <b>Kenny</b></li>
                        <li>Lindsay <b>Smith</b></li>
                        <li>Scott <b>Sorensen</b></li>
                        <li>Liam <b>Martin</b></li>
                        <li>Isaah <b>Yeo</b> (co-captain)</li>
                    </ul>
                </div>
                <div className="interchange">
                    <hr />
                    <p>INTERCHANGE</p>
                    <hr />
                    <ul>
                        <li>Daine <b>Laurie</b></li>
                        <li>Isaiah <b>Papali'i</b></li>
                        <li>Matthew <b>Eisenhuth</b></li>
                        <li>Luron <b>Patea</b></li>
                    </ul>
                </div>
                <p>COACH: Ivan <b>Cleary</b></p>
            </div>
        </>
    )
}

export default Teams