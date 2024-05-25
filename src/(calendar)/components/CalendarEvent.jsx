export const CalendarEvent = ({ event }) => {
    const { title, user } = event;

  return (
    <div>
        <strong>{ title }</strong>
        <br />
        <span>creado por: { user.name }</span>
    </div>
  )
}
