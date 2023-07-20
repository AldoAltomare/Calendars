// iniziamo cercando di capire QUANTE CELLE giorno sono da reare

const now = new Date() // Date è un costruttore di data che crea un nuovo oggetto Date (data)
// console.log(now)

const monthNames = [
    'Gennaio', // 0
    'Febbraio', // 1
    'Marzo', // 2
    'Aprile', // 3
    'Maggio', // 4
    'Giugno', // 5
    'Luglio', // 6
    'Agosto', // 7
    'Settembre', // 8
    'Ottobre', // 9
    'Novembre', // 10
    'Dicembre' // 11
]

const daysInThisMonth = function(){
    const getYear = now.getFullYear() //ci dà l'anno in corso
    const getMonth = now.getMonth() // ci dà il numero del mese in corso, da 0 a 11
    // ora mi serve il numero di giorni totali del mese
    // per fare ciò mi serve l'ultimo giorno del mese corrente
    // per arrivare a questo devo prendere il primo giorno del mese successivo e fare -1
    const lastDayDate = new Date(getYear, getMonth +1, 0)
    // console.log(lastDayDate)
    // qui ho preso una nuova data con:
    // anno corrente (getYear)
    // mese prossimo (getMonth +1)
    // primo giorno del mese prossimo meno uno (0) 
    // -> questo perchè i giorni del mese vanno da 1 a 31, quindi il giorno 0 è il giorno -1
    const lastDayOfMonth = lastDayDate.getDate()
    return lastDayOfMonth
    }

const printCurrentMonthInH1 = function(){
    const title = document.querySelector('h1')
    const monthIndex = now.getMonth()
    const currentMonth = monthNames[monthIndex]
    // console.log(currentMonth)
    title.innerText = currentMonth
}

const unselectAllDays = function(){
    // let allTheCells = document.querySelectorAll('.day')
    // allTheCells.forEach((day)=>{
    //     day.classList.remove('selected')
    // })

    // SOTTO METODO SMART

let previousSelected = document.querySelector('.selected')

if(previousSelected){
previousSelected.classList.remove('selected')
}
}

const changeDayNumber = function(dayIndex){
    let newMeetingDaySpan = document.getElementById('newMeetingDay')
    newMeetingDaySpan.innerText = dayIndex + 1

    newMeetingDaySpan.classList.add('hasDay')
}

const createDays = function(days){
    //days è il numero di celle da creare
    
    const calendarDiv = document.getElementById('calendar')
    
    for(let i=0; i < days ; i++){
        // creiamo un div vuoto
        let dayCellDiv = document.createElement('div')
        // aggiungiamo la classe day
        dayCellDiv.classList.add('day')
        // <div class="day"></div>

dayCellDiv.addEventListener('click',function(e){
    
unselectAllDays()

dayCellDiv.classList.add('selected')
// così ogni volta che clicco rimane il selected

// nello span con id = 'newMeetingDay'

changeDayNumber(i)


})


        let cellValue = document.createElement('h3')
        cellValue.innerText = i + 1
        
        dayCellDiv.appendChild(cellValue)
        calendarDiv.appendChild(dayCellDiv)
        
        // ora evidenziamo il giorno presente
        const today = now.getDate()
        
        if(i+1 === today){
            cellValue.classList.add('color-epic')
        }
    }
}

const saveMeeting = function(e){
e.preventDefault() // impedisco che si aggiorni la pagina prima di salvare gli eventi


}

const numberOfDays = daysInThisMonth()

printCurrentMonthInH1()

createDays(numberOfDays)

const formReference = document.querySelector('form')
formReference.addEventListener('submit', saveMeeting)





