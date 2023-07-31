using Microsoft.AspNetCore.Mvc;
using test_api2.Models;
using System.Collections.Generic;

namespace test_api2.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServicioController : ControllerBase
    {
        [HttpGet]
        public List<Servicio> ObtenerServicios()
        {
            var servicioService = new ServicioService();
            return servicioService.LeerServicios();
        }

        [HttpGet("{id:int}")]
        public Servicio ObtenerServicio(int id)
        {
            var servicioService = new ServicioService();
            return servicioService.BuscarServicio(id);
        }

        [HttpPost]
        public IActionResult AgregarServicio([FromBody] Servicio servicio)
        {
            var servicioService = new ServicioService();
            var res = servicioService.GuardarServicio(servicio);

            if (res)
                return Ok("Guardado con éxito");
            else
                return Ok("Error al guardar");
        }

        [HttpDelete("{id:int}")]
        public IActionResult EliminarServicio(int id)
        {
            var servicioService = new ServicioService();
            var res = servicioService.EliminarServicio(id);

            if (res)
                return Ok("Eliminado con éxito");
            else
                return Ok("Error al eliminar");
        }

        [HttpPut("{id:int}")]
        public IActionResult EditarServicio(int id, [FromBody] Servicio servicio)
        {
            var servicioService = new ServicioService();
            var res = servicioService.EditarServicio(id, servicio);

            if (res)
                return Ok("Editado con éxito");
            else
                return Ok("Error al editar");
        }
    }
}