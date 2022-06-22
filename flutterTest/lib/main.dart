import 'package:flutter/material.dart';
import 'package:english_words/english_words.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Startup Name Generator',
      theme: ThemeData(
          colorScheme: const ColorScheme(
              primary: Colors.greenAccent,
              //上方标题栏颜色
              secondary: Colors.green,
              background: Colors.white,
              error: Colors.red,
              brightness: Brightness.light,
              onBackground: Colors.pink,
              onError: Colors.yellow,
              onPrimary: Colors.white,
              //字体颜色
              onSecondary: Colors.redAccent,
              onSurface: Colors.redAccent,
              surface: Colors.redAccent
              // all fields should have a value
              )),
      home: const RandomWords(),
    );
  }
// Widget build(BuildContext context) {
//   var wordPair = WordPair.random();
//   return MaterialApp(
//     title: 'Welcome to Flutter',
//     home: Scaffold(
//       appBar: AppBar(
//         title: const Text('Welcome to Flutter'),
//       ),
//       body: const Center(
//         // child: Text('Hello World1'),
//         // child: Text(wordPair.asPascalCase),
//         child: RandomWords(),
//       ),
//     ),
//   );
// }
}

class RandomWords extends StatefulWidget {
  const RandomWords({Key? key}) : super(key: key);

  @override
  createState() => RandomWordsState();
}

// 一个无限滚动加载的懒加载列表
class RandomWordsState extends State<RandomWords> {
  final _suggestions = <WordPair>[]; // 存放单词列表
  final _biggerFont = const TextStyle(fontSize: 18.0); // 字体大小
  final _saved = <WordPair>{}; // 存放选中的item

  @override
  Widget build(BuildContext context) {
    // final wordPair = WordPair.random();
    // return Text(wordPair.asPascalCase);
    return Scaffold(
      appBar: AppBar(
        title: const Text('Startup Name Generator'),
        actions: <Widget>[
          IconButton(onPressed: _pushSaved, icon: const Icon(Icons.list))
        ],
      ),
      body: _buildSuggestions(),
    );
  }

  // 构建列表
  Widget _buildSuggestions() {
    return ListView.builder(
        padding: const EdgeInsets.all(16.0),
        // 对于每个建议的单词对都会调用一次itemBuilder，然后将单词对添加到ListTile行中
        // 在偶数行，该函数会为单词对添加一个ListTile row.
        // 在奇数行，该函数会添加一个分割线widget，来分隔相邻的词对。
        // 注意，在小屏幕上，分割线看起来可能比较吃力。
        itemBuilder: (context, i) {
          // 在每一列之前，添加一个1像素高的分隔线widget
          if (i.isOdd) return const Divider();
          // 语法 "i ~/ 2" 表示i除以2，但返回值是整形（向下取整），比如i为：1, 2, 3, 4, 5
          // 时，结果为0, 1, 1, 2, 2， 这可以计算出ListView中减去分隔线后的实际单词对数量
          final index = i ~/ 2;
          // 如果是建议列表中最后一个单词对
          if (index >= _suggestions.length) {
            // ...接着再生成10个单词对，然后添加到建议列表
            _suggestions.addAll(generateWordPairs().take(10));
          }
          return _buildRow(_suggestions[index]);
        });
  }

  Widget _buildRow(WordPair pair) {
    final alreadySaved = _saved.contains(pair);

    return ListTile(
      title: Text(
        pair.asPascalCase,
        style: _biggerFont,
      ),
      trailing: Icon(
        alreadySaved ? Icons.favorite : Icons.favorite_border,
        color: alreadySaved ? Colors.red : null,
      ),
      onTap: () {
        setState(() {
          if (alreadySaved) {
            _saved.remove(pair);
          } else {
            _saved.add(pair);
          }
        });
      },
    );
  }

  // 跳转页面的方法
  void _pushSaved() {
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (context) {
          // 前一个页面选中的数据作为这个页面显示的列表的数据源
          final tiles = _saved.map(
            (pair) {
              return ListTile(
                title: Text(
                  pair.asPascalCase,
                  style: _biggerFont,
                ),
              );
            },
          );
          final divided = ListTile.divideTiles(
            context: context,
            tiles: tiles,
          ).toList();
          return Scaffold(
            appBar: AppBar(
              title: const Text('Saved Suggestions'),
            ),
            body: ListView(children: divided),
          );
        },
      ),
    );
  }
}
