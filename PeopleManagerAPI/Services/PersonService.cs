using PeopleManagerAPI.Data;
using PeopleManagerAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace PeopleManagerAPI.Services
{
    public class PersonService: IPersonService
    {
        private readonly mycontext _context;

        public PersonService(mycontext context)
        {
            _context = context;

        }
        public async Task<List<Person>> GetAllPeople()
        {
            var people = _context.People.ToList();
            return people;
        }
        public async Task<Person> AddPerson(Person person)
        {
            var exists = await _context.People
            .AnyAsync(p => p.IdentityNumber == person.IdentityNumber);
            if (exists)
                throw new ArgumentException("משתמש עם תעודת זהות זו כבר קיים");
            _context.People.Add(person);
            await _context.SaveChangesAsync();
                return person;
        }
        public async Task<Person> UpdatePerson(int id, Person updated)
        {
            var person = await _context.People.FirstOrDefaultAsync(p => p.Id == id);
            if (person == null)
                throw new KeyNotFoundException("המשתמש לא זמין לעריכה");

            person.FirstName = updated.FirstName;
            person.LastName = updated.LastName;
            person.IdentityNumber = updated.IdentityNumber;
            person.PhoneNumber = updated.PhoneNumber;
            person.Email = updated.Email;

            await _context.SaveChangesAsync();
            return person;
        }
        public async Task DeletePerson(int id)
        {
            var person = await _context.People.FindAsync(id);
            if (person == null)
                throw new KeyNotFoundException("המשתמש לא זמין למחיקה");
            _context.People.Remove(person);
            await _context.SaveChangesAsync();
        }
    }
}
