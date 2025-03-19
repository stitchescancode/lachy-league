import LogoImg from '../../logos/positive-variant/lachy-league.png';

import { AnimatePresence, motion } from 'framer-motion';

function Logo() {
    return (
        <>
            <AnimatePresence>
                <motion.div style={{
                    position: 'absolute',
                    right: '1.7rem',
                    top: '1.3rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                    <motion.img
                        style={{ height: '9rem' }}
                        src={LogoImg}
                        alt=""
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                    />
                    <div style={{ position: 'relative', bottom: '1rem', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <div style={{ width: '10rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '.5rem', color: 'white', marginBottom: '.5rem' }} className="channel">
                            <h2 style={{ margin: 0, fontFamily: 'Rubik, sans-serif', fontSize: '1.8rem' }}>{import.meta.env.VITE_CHANNEL_NUMBER}</h2>
                            <div style={{ margin: 0, backgroundColor: '#03007c', color: 'white', fontFamily: 'Rubik, sans-serif', fontSize: '1rem' }} className="hd">
                                <h2 style={{ margin: 0, width: '50px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>HD</h2>
                            </div>
                        </div>
                        <div style={{ margin: 0, backgroundColor: '#03007c', color: 'white', fontFamily: 'Rubik, sans-serif', fontSize: '1rem', width: '7.3rem', height: '2.5rem', display: 'flex', alignItems: 'center' }} className="live">
                            <h2 style={{ margin: 0, width: '50px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', width: '100%', color: '#fff' }}>LIVE</h2>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence >
        </>
    )
}

export default Logo