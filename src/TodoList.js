var Component = require('Component');
var Todo = require('./Todo');
var TodoService = require('./TodoService');
var _ = require('lodash');

module.exports = class TodoList extends Component.Pure {

    componentWillMount() {
        this.registerStoreKey('todos');
        TodoService.getTodos();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !!this.state.todos && this.state.todos.length !== nextState.todos.length;
    }

    render() {
        var todos = this.state.todos || [];
        return (
            <div>
                <h2>Todos</h2>
                <Loading isLoading={!todos.length}>
                    {todos.map((todo, idx) => <Todo key={idx} rsKey={`todos.${idx}`} />)}
                </Loading>
            </div>
        )
    }


};

var Loading = props => props.isLoading ? <h1>I'm loading...</h1> : <div>{props.children}</div>;
