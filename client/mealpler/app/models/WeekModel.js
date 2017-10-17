Mealpler.service('WeekModel', function () {
   let service = this;
   const week = [
       {id: 1, name: 'Sun', fullName: 'Sunday'},
       {id: 2, name: 'Mon', fullName: 'Monday'},
       {id: 3, name: 'Tue', fullName: 'Tuesday'},
       {id: 4, name: 'Wed', fullName: 'Wednesday'},
       {id: 5, name: 'Thu', fullName: 'Thursday'},
       {id: 6, name: 'Fri', fullName: 'Friday'},
       {id: 7, name: 'Sat', fullName: 'Saturday'},
   ];
   service.weekDays = function () {
       return week;
   };
});