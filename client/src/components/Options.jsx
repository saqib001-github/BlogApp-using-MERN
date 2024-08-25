const Options = () => {
    const opt = {
        'uncategorized': 'Uncategorized',
        'java': 'Java',
        'reactjs': 'React.js',
        'nextjs': 'Next.js',
        'javascript': 'JavaScript',
        'c/c++': 'C/C++',
        'python': 'Python',
        'django': 'Django',
        'cmd': 'Command Prompt',
        'linux': 'Linux',
        'dsa': 'Data Structures and Algorithms',
        'os': 'Operating System',
        'computer networks': 'Computer Networking',
        'docker': 'Docker',
        'nodejs': 'Node.js',
        'git': 'Git/Github',
        'tailwind': 'Tailwind CSS',
        'typescript': 'TypeScript',
        'mongodb': 'MongoDB',
        'postgresql': 'PostgreSQL',
        'orm': 'ORM',
    }
    
    return (<>
            {Object.entries(opt).map(([key, val]) => (
                <option key={key} value={key}>{val}</option>
            ))}
        </>)
}

export default Options;
