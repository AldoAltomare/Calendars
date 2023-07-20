// iniziamo cercando di capire QUANTE CELLE giorno sono da creare
// creiamo una "cassettiera" di tanti array per ogni giorno con gli eventi salvati ogni giorno

const appointments = []
// prendo i giorni da mettere dentro dalla funzione createDays 
// inserisco nel ciclo for di quella funzione
//  un push di array vuoto

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

const showAppointments = function(indexOfAppointments){
    // preleVare eventi dal cassetto indexOfAppointments
    const selectedDayAppointments = appointments[indexOfAppointments]
    const appointmentsList = document.getElementById('appointmentsList')
    // ripulisco la ul: così non si creano righe con eventi precedenti
    appointmentsList.innerHTML = ''
    // generare tanti <li> quante sono le stringhe salvate
    selectedDayAppointments.forEach((appointment)=> {
        const newLi = document.createElement('li')
        newLi.innerText = appointment
        // appendere gli <li> al dom
        appointmentsList.appendChild(newLi)
    })
    // togliere display: none al <div>
    document.getElementById('appointments').style.display = 'block'
}

const createDays = function(days){
    //days è il numero di celle da creare
    
    const calendarDiv = document.getElementById('calendar')
    
    for(let i=0; i < days ; i++){
        // creo un array vuoto per salvare i giorni
        appointments.push([])
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

// mostriamo la sezione finora nascosta "appointments"
if (appointments[i].length > 0){ // è l'array degli eventi della giornata
showAppointments(i)
}else{
    document.getElementById('appointments').style.display = 'none'
}// ri-nascondiamo la sezione quando non è selezionato il giorno esatto

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
// seleziono il giorno scelto dallo span
const selectedDay = document.getElementById('newMeetingDay').innerText
// input fields non hanno innerText ma hanno value, seleziono l'ora
const meetingTime = document.getElementById('newMeetingTime').value
// seleziono il nome
const meetingName = document.getElementById('newMeetingName').value
// creo la stringa con ora e nome
const meetingString = meetingTime + " - " + meetingName
// ora inserisco la string nel cassetto giusto
const rightIndex = parseInt(selectedDay) - 1 // trasformo la string con il giorno in un numero
appointments[rightIndex].push(meetingString)
console.log('APPOINTMENTS', appointments)
// mostriamo la sezione finora nascosta "appointments"
// sempre in createDays
showAppointments(rightIndex)

}



const numberOfDays = daysInThisMonth()

printCurrentMonthInH1()

createDays(numberOfDays)

const formReference = document.querySelector('form')
formReference.addEventListener('submit', saveMeeting)




