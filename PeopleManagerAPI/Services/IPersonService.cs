using PeopleManagerAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PeopleManagerAPI.Services
{
    public interface IPersonService
    {
        Task<List<Person>> GetAllPeople();
        Task<Person> AddPerson(Person person);
        Task<Person> UpdatePerson(int id, Person person);
        Task DeletePerson(int id);
    }
}
