using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using Application.Activities;
using MediatR;
using Domain;
namespace API.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ActivitiesController : ControllerBase
  {
    private readonly IMediator _mediator;
    public ActivitiesController(IMediator mediator)
    {
      this._mediator = mediator;

    }

    // GET api/values
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> List()
    {
      var activities = await _mediator.Send(new List.Query());
      return Ok(activities);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> Details(int id)
    {
      var activity = await _mediator.Send(new Details.Query { Id = id });
      return Ok(activity);
    }

    [HttpPost]
    public async Task<ActionResult<Unit>> Create(Create.Command command)
    {
      return await _mediator.Send(command);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Unit>> Edit(int id, Edit.Command command)
    {
      command.Id = id;
      return await _mediator.Send(command);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Unit>> Delete(int id)
    {

      return await _mediator.Send(new Delete.Command { Id = id });
    }
  }
}