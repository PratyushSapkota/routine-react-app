import React, { useEffect, useState, } from 'react'

function Lobuche() {

    const [Monday, setMonday] = useState([])
    const [Tuesday, setTuesday] = useState([])
    const [Wednesday, setWednesday] = useState([])
    const [Thursday, setThursday] = useState([])
    const [Friday, setFriday] = useState([])
    const [decoder, setDecoder] = useState([])
    const [highlightsLobuche, setHighlightsLobuche] = useState([])
    const [today, setToday] = useState(new Date().getDay())
    const [loadAgain, setLoadAgain] = useState(false)

    useEffect(() => {
        fetch('https://cyan-worm-sari.cyclic.cloud/api/lobuche').then((res) => {
            res.json().then((response) => {
                setMonday(response.lobuche.Monday)
                setTuesday(response.lobuche.Tuesday)
                setWednesday(response.lobuche.Wednesday)
                setThursday(response.lobuche.Thursday)
                setFriday(response.lobuche.Friday)
                setDecoder(response.decoder)
                setHighlightsLobuche(response.ids_lobuche)
            })
        })
    }, [])

    useEffect(() => {
        if (loadAgain) {
            fetch('https://cyan-worm-sari.cyclic.cloud/api/lobuche').then((res) => {
            res.json().then((response) => {
                setMonday(response.lobuche.Monday)
                setTuesday(response.lobuche.Tuesday)
                setWednesday(response.lobuche.Wednesday)
                setThursday(response.lobuche.Thursday)
                setFriday(response.lobuche.Friday)
                setDecoder(response.decoder)
                setHighlightsLobuche(response.ids_lobuche)
            })
        })
            setLoadAgain(false)
        }

    }, [loadAgain])



    const NumToDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    let HSubjects = []

    const highlightsLen = highlightsLobuche.length

    for (let index = 0; index < highlightsLen; index++) {
        const element = highlightsLobuche[index];
        HSubjects.push(element)
    }



    const PostTo = (id) => {
        try {
            fetch('https://cyan-worm-sari.cyclic.cloud/api/insert', {
                method: "POST",
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ "teacher": id, "section": "lobuche" })
            }).then(() => {
                setLoadAgain(true)
            })
        } catch (e) {
            console.log("From post:", e)
        }
    }

    const viewNonDefault = (day) => {
        setToday(day)
    }


    const MondayComponent = () => {
        return <>
            <tr><h1>{NumToDays[1]}</h1></tr>
            <tr>
                {
                    Monday.map((item) =>
                        <>
                            <button key={item} onClick={() => PostTo(item)} className={HSubjects.includes(item) ? 'btn btn-primary' : 'btn'}>{decoder[item]}</button> <br />
                        </>
                    )
                }
            </tr>
        </>
    }
    const TuesdayComponent = () => {
        return <>
            <tr><h1>{NumToDays[2]}</h1></tr>
            <tr>
                {
                    Tuesday.map((item) =>
                        <>
                            <button key={item} onClick={() => PostTo(item)} className={HSubjects.includes(item) ? 'btn btn-primary' : 'btn'}>{decoder[item]}</button> <br />
                        </>
                    )
                }
            </tr>
        </>
    }
    const WednesdayComponent = () => {
        return <>
            <tr><h1>{NumToDays[3]}</h1></tr>
            <tr>
                {
                    Wednesday.map((item) =>
                        <>
                            <button key={item} onClick={() => PostTo(item)} className={HSubjects.includes(item) ? 'btn btn-primary' : 'btn'}>{decoder[item]}</button> <br />
                        </>
                    )
                }
            </tr>
        </>
    }
    const ThursdayComponent = () => {
        return <>
            <tr><h1>{NumToDays[4]}</h1></tr>
            <tr>
                {
                    Thursday.map((item) =>
                        <>
                            <button key={item} onClick={() => PostTo(item)} className={HSubjects.includes(item) ? 'btn btn-primary' : 'btn'}>{decoder[item]}</button> <br />
                        </>
                    )
                }
            </tr>
        </>
    }
    const FridayComponent = () => {
        return <>
            <tr><h1>{NumToDays[5]}</h1></tr>
            <tr>
                {
                    Friday.map((item) =>
                        <>
                            <button key={item} onClick={() => PostTo(item)} className={HSubjects.includes(item) ? 'btn btn-primary' : 'btn'}>{decoder[item]}</button> <br />
                        </>
                    )
                }
            </tr>
        </>
    }
    const SaturdayComponent = () => {
        return <>
            <tr><h1>{NumToDays[6]}</h1></tr>
            <tr>
                <h6>No Classes on Saturday!</h6>
            </tr>
        </>
    }
    const SundayComponent = () => {
        return <>
            <tr><h1>{NumToDays[0]}</h1></tr>
            <tr>
                <h6>No Classes on Sunday!</h6>
            </tr>
        </>
    }

    return (
        <>
            <h1 className='h1 text-center'>Lobuche</h1>
            
            <div className='container'>
                <div className='row'>
                    <div className='col'>

                    {
                        today === 1 ? <MondayComponent />
                            :
                            today === 2 ? <TuesdayComponent />
                                :
                                today === 3 ? <WednesdayComponent />
                                    :
                                    today === 4 ? <ThursdayComponent />
                                        :
                                        today === 5 ? <FridayComponent />
                                            :
                                            today === 0 ? <SundayComponent />
                                                :
                                                today === 6 ? <SaturdayComponent />
                                                    :
                                                    null
                    }
                    </div>

                    <div className='col'>
                        {HSubjects.map((item) =>
                            <>
                                <p>{decoder[item]} <button className='btn btn-danger' onClick={() => PostTo(item)}> </button> </p>
                            </>
                        )}
                    </div>

                    <div className='col'>
                        {NumToDays.map((item, index) =>
                            <>
                                <button key={item} onClick={() => viewNonDefault(index)} className='btn'>{item}</button> <br />
                            </>
                        )}
                    </div>
                </div>
            </div>



        </>
    )
}

export default Lobuche
