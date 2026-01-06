export default function calculateStreak(dates: Date[]){
    // normalise all dates to midnight
    const days = dates.map(d=>{
        const x = new Date(d)
        x.setHours(0,0,0,0)
        return x.getTime()
    })
    .sort((a, b) => b-a)

    let streak = 0
    let expected  = new Date()
    expected.setHours(0,0,0,0)

    for(const day of days){
        if(day === expected.getTime()){
            streak++
            expected.setDate(expected.getDate() -1)
        } else if (day < expected.getTime()){
            break
        }
    }

    return streak
}