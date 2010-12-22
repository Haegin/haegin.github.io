require 'date'

def jekyll(opts = "", path = "")
  sh "rm -rf _site"
  sh path + "jekyll " + opts
end

desc "Create a new draft post"
task :post do
    title = ENV['TITLE']
    slug = "#{Date.today}-#{title.downcase.gsub(/[\s]+/, '-')}"

    file = File.join(
        File.dirname(__FILE__),
        '_posts',
        slug + '.markdown'
    )

    File.open(file, 'w') do |f|
        f << <<-EOS.gsub(/^ /, "")
---
layout: post
title: #{title}
category: 
---

        EOS
    end

    system ("#{ENV['EDITOR']} #{file}")
end

desc "Build site using Jekyll"
task :build => [:cssmin, :jsmin] do
  jekyll
end

desc "Serve on Localhost with port 4000"
task :default => [:cssmin, :jsmin] do
    jekyll("--server --auto")
end

desc "Compile all the css files using less css"
task :lessc do
    FileList['css/*.less'].each do |lessfile|
        sh "lessc #{lessfile} --verbose"
    end
end

desc "Minify all the javascript files"
task :jsmin do
    sh "rm -f lib/combined.js*"
    sh "cat lib/*.js > lib/combined.js"
    sh "yuicompressor.jar -o lib/combined.js.min lib/combined.js"
#    FileList['lib/*.js'].each do |jsfile|
#        sh "yuicompressor.jar -o #{jsfile}.min #{jsfile}"
#    end
end

desc "Minify all the css files"
task :cssmin => :lessc do
    sh "rm -f css/combined.css*"
    sh "cat css/reset.css > css/combined.css"
    FileList['css/*.css'].each do |cssfile|
        if cssfile != "css/combined.css" && cssfile != "css/reset.css"
            sh "cat #{cssfile} >> css/combined.css"
        end
#        sh "yuicompressor.jar -o #{cssfile}.min #{cssfile}"
    end
    sh "yuicompressor.jar -o css/combined.css.min css/combined.css"
end

desc "Deploy to Live Site"
task :deploy => :"deploy:live"

namespace :deploy do
  desc "Deploy to Dev"
  task :dev => :build do
    rsync "dev.appden.com"
  end

  desc "Deploy to Live"
  task :live => :build do
    rsync "haeg.in"
  end

  desc "Deploy to Dev and Live"
  task :all => [:dev, :live]

  def rsync(domain)
	sh "chmod a+rx -R _site"
    sh "rsync -rtpz --delete _site/ hjmills@haeg.in:~/#{domain}"
  end
end

