using Microsoft.AspNetCore.Mvc;
using test_api2.Models;
using System.Collections.Generic;

namespace test_api2.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RefaccionController : ControllerBase
    {
        [HttpGet]
        public List<Refaccion> ObtenerRefacciones()
        {
            var refaccionService = new RefaccionService();
            return refaccionService.LeerRefacciones();
        }

        [HttpGet("{id:int}")]
        public Refaccion ObtenerRefaccion(int id)
        {
            var refaccionService = new RefaccionService();
            return refaccionService.BuscarRefaccion(id);
        }

        [HttpPost]
        public IActionResult AgregarRefaccion([FromBody] Refaccion refaccion)
        {
            var refaccionService = new RefaccionService();
            var res = refaccionService.GuardarRefaccion(refaccion);

            if (res)
                return Ok("Guardado con éxito");
            else
                return Ok("Error al guardar");
        }

        [HttpDelete("{id:int}")]
        public IActionResult EliminarRefaccion(int id)
        {
            var refaccionService = new RefaccionService();
            var res = refaccionService.EliminarRefaccion(id);
            if (res)
                return Ok("Eliminado con éxito");
            else
                return Ok("Error al eliminar");
        }

        [HttpPut("{id:int}")]
        public IActionResult EditarRefaccion(int id, [FromBody] Refaccion refaccion)
        {
            var refaccionService = new RefaccionService();
            var res = refaccionService.EditarRefaccion(id, refaccion);

            if (res)
                return Ok("Editado con éxito");
            else
                return Ok("Error al editar");
        }
    }
}