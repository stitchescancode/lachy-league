import Roosters from '../assets/roosters.webp';
import Raiders from '../assets/raiders.svg';
import Panthers from '../assets/panthers.webp';
import Storm from '../assets/storm.webp';
import Manly from '../assets/manly.svg';
import Titans from '../assets/titans.webp';
import Broncos from '../assets/broncos.webp';
import Bulldogs from '../assets/bulldogs.webp';
import Sharks from '../assets/sharks.webp';
import Dolphins from '../assets/dolphins.svg';
import Warriors from '../assets/warriors.webp';
import Knights from '../assets/knights.webp';
import Cowboys from '../assets/cowboys.webp';
import Eels from '../assets/eels.webp';
import Rabbitohs from '../assets/rabbitohs.svg';
import Dragons from '../assets/dragons.svg';
import Tigers from '../assets/tigers.webp';
import Wigan from '../assets/wigan.webp';
import Warrington from '../assets/warrington-wolves.svg';
import AustraliaWomen from '../assets/australia-jillaroos.svg';
import EnglishWomen from '../assets/england-lionesses.png';

const teams = [
    { team: 'Brisbane Broncos' },
    { team: 'Penrith Panthers' },
    { team: 'Sydney Roosters' },
    { team: 'Melbourne Storm' },
    { team: 'Cronulla Sharks' },
    { team: 'Canberra Raiders' },
    { team: 'New Zealand Warriors' },
    { team: 'Dolphins' }
];

const getLogo = (teamName) => {
    const logos = {
        'Sydney Roosters': Roosters,
        'Melbourne Storm': Storm,
        'Canberra Raiders': Raiders,
        'Penrith Panthers': Panthers,
        'Manly Warringah Sea Eagles': Manly,
        'Gold Coast Titans': Titans,
        'Brisbane Broncos': Broncos,
        'Canterbury-Bankstown Bulldogs': Bulldogs,
        'Cronulla Sharks': Sharks,
        'Dolphins': Dolphins,
        'New Zealand Warriors': Warriors,
        'Newcastle Knights': Knights,
        'North Queensland Cowboys': Cowboys,
        'Parramatta Eels': Eels,
        'South Sydney Rabbitohs': Rabbitohs,
        'St George Illawarra Dragons': Dragons,
        'Wests Tigers': Tigers,
        'Wigan Warriors': Wigan,
        'Warrington Wolves': Warrington,
        'Australia Jillaroos': AustraliaWomen,
        'England Lionesses': EnglishWomen
    };
    return logos[teamName] || '';
};

const getAbbTeamName = (teamName) => {
    const abbreviations = {
        'Sydney Roosters': 'Roosters',
        'Melbourne Storm': 'Storm',
        'Canberra Raiders': 'Raiders',
        'Penrith Panthers': 'Panthers',
        'Manly Warringah Sea Eagles': 'Sea Eagles',
        'Gold Coast Titans': 'Titans',
        'Brisbane Broncos': 'Broncos',
        'Canterbury-Bankstown Bulldogs': 'Bulldogs',
        'Cronulla Sharks': 'Sharks',
        'Dolphins': 'Dolphins',
        'New Zealand Warriors': 'Warriors',
        'Newcastle Knights': 'Knights',
        'North Queensland Cowboys': 'Cowboys',
        'Parramatta Eels': 'Eels',
        'South Sydney Rabbitohs': 'Rabbitohs',
        'St George Illawarra Dragons': 'Dragons',
        'Wests Tigers': 'Tigers',
        'Wigan Warriors': 'Wigan Warriors',
        'Warrington Wolves': 'Warrington Wolves',
        'Australia Jillaroos': 'Jillaroos',
        'England Lionesses': 'Lionesses'
    };
    return abbreviations[teamName] || teamName;
};

const getColor = (teamName) => {
    switch (teamName) {
        case 'Sydney Roosters': return '#E82C2E';
        case 'Melbourne Storm': return '#632390';
        case 'Canberra Raiders': return '#C3D941';
        case 'Penrith Panthers': return '#221F20';
        case 'Manly Warringah Sea Eagles': return '#6F0F3B';
        case 'Gold Coast Titans': return '#0072AE';
        case 'Brisbane Broncos': return '#760036';
        case 'Canterbury-Bankstown Bulldogs': return '#0054A4';
        case 'Cronulla Sharks': return '#0088b9';
        case 'Dolphins': return '#f70e15';
        case 'New Zealand Warriors': return '#108048';
        case 'Newcastle Knights': return '#00539F';
        case 'North Queensland Cowboys': return '#FFDD02';
        case 'Parramatta Eels': return '#FFD326';
        case 'South Sydney Rabbitohs': return '#003C1A';
        case 'St George Illawarra Dragons': return '#E2231B';
        case 'Wests Tigers': return '#F68C1A';
        case 'Wigan Warriors': return '#84222f';
        case 'Warrington Wolves': return '#005ba5';
        case 'Australia Jillaroos': return '#00843D';
        case 'England Lionesses': return '#ffffff';
        default: return '';
    }
};

const getImageSize = (teamName) => {
    switch (teamName) {
        case 'Sydney Roosters': return ['0rem', '-.6rem', '-1.4rem', '0rem', '7rem'];
        case 'Melbourne Storm': return ['0rem', '-1.9rem', '-1.5rem', '0rem', '6rem'];
        case 'Canberra Raiders': return ['0rem', '-1.975rem', '-2.9rem', '0rem', '8rem'];
        case 'Penrith Panthers': return ['0rem', '-4.2rem', '-2.7rem', '0rem', '10rem']; // Right, left, top, bottom
        case 'Manly Warringah Sea Eagles': return ['0rem', '0rem', '0rem', '0rem', '4rem'];
        case 'Gold Coast Titans': return ['0rem', '-0.5rem', '0rem', '0rem', '5rem'];
        case 'Brisbane Broncos': return ['0rem', '-1.7rem', '-0.6rem', '0rem', '6rem'];
        case 'Canterbury-Bankstown Bulldogs': return ['0rem', '-1.2rem', '0rem', '0rem', '7rem'];
        case 'Cronulla Sharks': return ['0rem', '-1.7rem', '-1.2rem', '0rem', '6rem'];
        case 'Dolphins': return ['0rem', '0rem', '-1.5rem', '0rem', '10rem']; // Right, left, top, bottom
        case 'New Zealand Warriors': return ['0rem', '-1.05rem', '-1rem', '0rem', '6rem'];
        case 'Newcastle Knights': return ['0rem', '-1.4rem', '-1.2rem', '0rem', '6rem'];
        case 'North Queensland Cowboys': ['0rem', '0rem', '0rem', '0rem', '4rem'];
        case 'Parramatta Eels': return ['0rem', '0.4rem', '-1.4rem', '0rem', '7rem'];
        case 'South Sydney Rabbitohs': return ['0rem', '.5rem', '-1.7rem', '0rem', '7rem']
        case 'St George Illawarra Dragons': return ['0rem', '0rem', '-.6rem', '0rem', '6rem'];
        case 'Wests Tigers': return ['0rem', '-1.7rem', '-1.4rem', '0rem', '7.5rem'];
        case 'Wigan Warriors': return ['0rem', '-2rem', '-2.2rem', '0rem', '8rem'];
        case 'Warrington Wolves': return ['0rem', '-1.5rem', '-2.2rem', '0rem', '7rem'];
        case 'Australia Jillaroos': return ['0rem', '-3.1rem', '-2.5rem', '0rem', '9.5rem']; // Right, left, top, bottom
        case 'England Lionesses': return ['0rem', '-1.8rem', '-.4rem', '0rem', '8rem']; // Right, left, top, bottom
        default: return '';
    }
};

function darkenColor(hex, percentage) {
    if (!hex.startsWith('#')) hex = `#${hex}`;
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    r = Math.max(0, Math.min(255, Math.round(r - (r * percentage / 100))));
    g = Math.max(0, Math.min(255, Math.round(g - (g * percentage / 100))));
    b = Math.max(0, Math.min(255, Math.round(b - (b * percentage / 100))));

    const darkenedHex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
    return darkenedHex;
}

const negative = '2rem'

function Ladder() {
    return (
        <div style={{ background: 'linear-gradient(#313131, #202020)', width: '20rem', fontFamily: 'Sour Gummy, sans-serif', color: 'white', borderRadius: '.25rem' }}>
            <div style={{ padding: '1rem 1.5rem' }}>
                <h1 style={{ margin: 0, textTransform: 'uppercase' }}>Ladder</h1>
                <p style={{ margin: 0, textTransform: 'uppercase' }}>NRL Round 2</p>
            </div>
            <div>
                {teams.map((team, index) => (
                    <div key={index}>
                        <hr style={{ margin: 0, opacity: 0.05 }} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
                            <div style={{ width: '6rem', height: '2.5rem', backgroundColor: 'black', borderTopRightRadius: '10rem', borderBottomRightRadius: '10rem', display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                                <div className="home-logo-wrapper"
                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '2rem', height: '2rem', borderRadius: '100%', marginRight: '.25rem', overflow: 'hidden', border: `3px solid ${getColor(team.team)}`, boxShadow: `0 0 10px 9px ${darkenColor(getColor(team.team))}`, position: 'relative' }}>
                                    <img style={{
                                        width: `calc(${getImageSize(team.team)[4]} - ${negative})`,
                                        height: `calc(${getImageSize(team.team)[4]} - ${negative})`,
                                        right: `${getImageSize(team.team)[0]}`,
                                        bottom: `${getImageSize(team.team)[3]}`,
                                        top: `${getImageSize(team.team)[2]}`,
                                        left: `${getImageSize(team.team)[1]}`,
                                        objectFit: 'contain',
                                        position: 'absolute'
                                    }} className="img home_team_img" src={getLogo(team.team)} alt={team.team} />
                                </div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div style={{ display: 'flex', gap: '.5rem' }}>
                                    <p style={{ margin: 0 }}>{index + 1}.</p>
                                    <p style={{ margin: 0 }}>{getAbbTeamName(team.team)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Ladder;