var addTimezone = document.getElementById('addTimezone')
var selectedTimezone = document.getElementById('timezone')

var worldClock = []

addTimezone.onclick = () => {
    var value = selectedTimezone.options[selectedTimezone.selectedIndex].value
    if(value){
        if(!worldClock.includes(value)){
            worldClock.push(value)
            renderClock()
        }
        else{
            alert('Your selected timezone is already set')
        }
    }
    else{
        alert('Please select a timezone.')
    }
}

const renderClock = () => {
    var node = document.getElementById('clock')
    let timeSet = ''
    for(let x = 0; x < worldClock.length; x++){
        var DateTime = luxon.DateTime
        var local = DateTime.local()
        var rezoned = local.setZone(worldClock[x])
        rezoned.c.hour >= 12 ? amPm = 'PM' : amPm = 'AM'
        rezoned.c.hour > 12 ? rezoned.c.hour -= 12 : rezoned.c.hour
        rezoned.c.hour < 10 ? rezoned.c.hour = '0' + rezoned.c.hour : rezoned.c.hour
        rezoned.c.minute < 10 ? rezoned.c.minute = '0' + rezoned.c.minute : rezoned.c.minute
        rezoned.c.second < 10 ? rezoned.c.second = '0' + rezoned.c.second : rezoned.c.second
        timeSet = timeSet + `<li> <h2>${worldClock[x]}</h2>
                    <div>
                        ${rezoned.weekdayLong} -
                        ${rezoned.c.hour}:${rezoned.c.minute}:${rezoned.c.second} ${amPm}
                    </div></li>`
    }
    node.innerHTML = timeSet
    setTimeout(renderClock, 1000)
}
