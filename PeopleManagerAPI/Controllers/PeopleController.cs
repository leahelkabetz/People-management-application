using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PeopleManagerAPI.Models;
using PeopleManagerAPI.Services;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace PeopleManagerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly IPersonService _service;
        public PeopleController(IPersonService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPeople()
        {
            try
            {
                var people = await _service.GetAllPeople();
                return Ok(people); 
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאה פנימית בשרת: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddPerson([FromBody] Person person)
        {
            try
            {
                var created = await _service.AddPerson(person);
                return Ok(created);
            }
            catch (ArgumentException ex) 
            {
                return BadRequest(ex.Message); 
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאה פנימית בשרת: {ex.Message}"); 
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePerson(int id, [FromBody] Person person)
        {
            if (id != person.Id)
                return BadRequest("המזהה שנשלח אינו תואם לאובייקט");
            try
            {
               var updated= await _service.UpdatePerson(id,person);
                return Ok("עודכן בהצלחה");
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "שגיאה פנימית בשרת: " + ex.Message);
            }

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePerson(int id)
        {
            try
            {
                await _service.DeletePerson(id);
                return Ok("נמחק בהצלחה");
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "שגיאה פנימית בשרת: " + ex.Message);
            }
        }
    }
}
