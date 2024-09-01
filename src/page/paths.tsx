export default function () {
  return NavLinkList(
    {
      trigonometry: ['sin', 'cos', 'tan'],
      units: ['length', 'mass']
    }
  )
};

type P = string[] | { [key: string]: P };

function NavLinkList(obj: { [key: string]: P }, basePath = '') {
  return <ul>
    {
      Object.entries(obj).map(([key, value]) => {
        const currentPath = `${basePath}/${key}`;

        return Array.isArray(value) ? (
          <li key={currentPath} >
            <a href={currentPath}> {key} </a>
            <ul>
              {
                value.map(item => (
                  <li key={`${currentPath}/${item}`}>
                    <a href={`${currentPath}/${item}`}> {item} </a>
                  </li>
                ))
              }
            </ul>
          </li>
        ) : (
          <li key={currentPath} >
            <a href={currentPath}> {key} </a>
            {NavLinkList(value, currentPath)}
          </li>
        );
      })}
  </ul>
};
