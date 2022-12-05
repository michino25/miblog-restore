const handlebars = require('handlebars');

module.exports = {
    sum: (a, b) => a + b,
    sortable: (field, sort) => {
        sort.type = ['asc', 'desc'].includes(sort.type) ? sort.type : 'default';
        const sortType = field === sort.column ? sort.type : 'default';

        const icons = {
            default: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrows-sort" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M3 9l4 -4l4 4m-4 -4v14"></path>
                        <path d="M21 15l-4 4l-4 -4m4 4v-14"></path>
                    </svg>`,
            asc: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-up" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="18" y1="11" x2="12" y2="5"></line>
                    <line x1="6" y1="11" x2="12" y2="5"></line>
                </svg>`,
            desc: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-down" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="18" y1="13" x2="12" y2="19"></line>
                    <line x1="6" y1="13" x2="12" y2="19"></line>
                </svg>`,
        };

        const types = {
            default: 'desc',
            desc: 'asc',
            asc: 'desc',
        };

        const icon = icons[sortType];
        const type = types[sortType];

        const query = handlebars.escapeExpression(
            `?_sort&column=${field}&type=${type}`,
        );
        const output = `<a class="sort-btn" href="${query}">
                            ${icon}
                        </a>`;
        return new handlebars.SafeString(output);
    },
};
