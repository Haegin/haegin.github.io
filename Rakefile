require 'date'

def jekyll(opts = "", path = "/home/harry/.gem/ruby/1.8/bin/")
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
task :default => :lessc do
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
    FileList['lib/*.js'].each do |jsfile|
        sh "yuicompressor.jar -o #{jsfile}.min #{jsfile}"
    end
end

rule '.js.min' => '.js' do |file|
    sh "yuicompressor.jar -o #{file.name} #{file.source}"
end

desc "Minify all the css files"
task :cssmin => :lessc do
    FileList['css/*.css'].each do |cssfile|
        sh "yuicompressor.jar -o #{cssfile}.min #{cssfile}"
    end
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

