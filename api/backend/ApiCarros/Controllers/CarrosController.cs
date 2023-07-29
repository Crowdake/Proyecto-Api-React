using Microsoft.AspNetCore.Mvc;
using test_api2.Models;

namespace test_api2.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarrosController : ControllerBase
    {
        [HttpGet]
        public List<Carros> LeerCarros()
        {
            var carrosService = new CarroService(); // Corregido: Cambiar "CarrosService" a "CarroService"
            return carrosService.LeerCarros();
        }

        [HttpGet("{id:int}")]
        public Carros BuscarCarro(int id)
        {
            var carrosService = new CarroService(); // Corregido: Cambiar "CarrosService" a "CarroService"
            
            return carrosService.BuscarCarro(id); ;
        }

        [HttpPost]
        public IActionResult AgregarCarro([FromBody] Carros carro)
        {
            var carrosService = new CarroService(); // Corregido: Cambiar "CarrosService" a "CarroService"
            var res = carrosService.GuardarCarro(carro);
            if (res)
                return Ok("Guardado con éxito");
            else
                return BadRequest("Error al guardar"); // Return 400 Bad Request if there was an error.
        }

        [HttpDelete("{id:int}")]
        public IActionResult EliminarCarro(int id)
        {
            var carrosService = new CarroService(); // Corregido: Cambiar "CarrosService" a "CarroService"
            var success = carrosService.EliminarCarro(id);
            if (success)
                return Ok("Eliminado con éxito");
            else
                return Ok("Error al eliminar"); // Return 404 Not Found if the car to delete is not found.
        }

        [HttpPut("{id:int}")]
        public IActionResult EditarCarro(int id, [FromBody] Carros carro)
        {
            var carrosService = new CarroService(); // Corregido: Cambiar "CarrosService" a "CarroService"            

            var res = carrosService.EditarCarro(id, carro);
            if (res)
                return Ok("Editado con ´´exito"); // Return 204 No Content for successful updates.
            else
                return Ok("Error al editar"); // Return 400 Bad Request if there was an error updating the car.
        }
    }
}
